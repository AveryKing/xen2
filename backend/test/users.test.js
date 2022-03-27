require('dotenv').config();
const supertest = require('supertest');
const  usersRouter = require('../src/users/users.router');
const makeTestApp = require("./makeTestApp");
const app = makeTestApp('/users', usersRouter);

describe("users route", () => {
    it("GET /:userId returns 404 if user does not exist" , async () => {
        const userId = 99999;
        const response = await supertest(app).get(`/users/${userId}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toContain('not found');
    });

    it("Request body includes data", async () => {
        const response = await supertest(app)
            .post('/users')
            .set('Accept', 'application/json')
            .send();
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe('Request body is malformed');
    })

    describe("Cannot create an account without required parameters", () => {
        const requiredParameters = ['email', 'username', 'password'];
        requiredParameters.forEach(parameter => {
            it(`validates presence of ${parameter} parameter`, async () => {
                const params =  requiredParameters.filter(x => x !== parameter);
                const response = await supertest(app)
                    .post('/users')
                    .set('Accept', 'application/json')
                    .send({data:params.reduce((acc, param) => {
                            acc[param] = 'data';
                            return acc;
                        }, {})});
                expect(response.status).toBe(400);
                expect(response.body.error).toBeDefined();
                requiredParameters.filter(x => !params.includes(x))
                    .forEach(param => expect(response.body.error).toContain(param));

            })
        })

    })
})