require('dotenv').config();
const supertest = require('supertest');
const  usersRouter = require('../src/users/users.router');
const makeTestApp = require("./makeTestApp");
const app = makeTestApp('/users', usersRouter);
const knex = require('../src/db/connection')
    test("GET /:userId returns 404 if user does not exist" , async () => {
        const userId = 99999;
        const response = await supertest(app).get(`/users/${userId}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toContain('not found');
    });



    describe("Account creation", () => {
        test("data required in request.body", async () => {
            const response = await supertest(app)
                .post('/users')
                .set('Accept', 'application/json')
                .send();
            expect(response.body.error).toBeDefined();
            expect(response.body.error).toBe('Request body is malformed');
        })

        knex.seed.run();
        const requiredParameters = ['email', 'username', 'password'];
        requiredParameters.forEach(parameter => {
            test(`${parameter} parameter required`, async () => {
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

    test("POST to /users creates a new account", async () => {
        const response = await supertest(app)
            .post('/users/')
            .set('Accept','application/json')
            .send({
                data: {
                    username:'username123',
                    email:'email123456',
                    password:'password321'
                }
            });
        console.log(response.body)
        expect(response.body.error).toBeUndefined();
        expect(response.body.data).toContain('successfully');
    })
