require('dotenv').config();
const supertest = require('supertest');
const usersRouter = require('../src/users/users.router');
const makeTestApp = require("./makeTestApp");
const service = require('../src/users/users.service');
const app = makeTestApp('/users', usersRouter);
const knex = require('../src/db/connection')
const testUserData = require('../src/db/test/config/testUserData')

/***
 * Include --runInBand flag when running Jest for tests to pass!
 */

describe('list', () => {
    test('GET / returns a list of all users', async () => {
        await knex.seed.run()
        const {body: {data}} = await supertest(app).get('/users');
        for (let i in testUserData) {
            expect(data[i].username).toEqual(testUserData[i].username);
        }

    })
})

describe('read', () => {
    test("GET /:userId returns 404 if user does not exist", async () => {
        const userId = 99999;
        const response = await supertest(app).get(`/users/${userId}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toContain('not found');
    });
})

describe("create", () => {
    describe('request validation', () => {
        test("data required in request.body", async () => {
            const response = await supertest(app)
                .post('/users')
                .set('Accept', 'application/json')
                .send();
            expect(response.body.error).toBeDefined();
            expect(response.body.error).toBe('Request body is malformed');
        })

        const requiredParameters = ['email', 'username', 'password'];
        requiredParameters.forEach(parameter => {
            test(`${parameter} parameter required`, async () => {
                const params = requiredParameters.filter(x => x !== parameter);
                const response = await supertest(app)
                    .post('/users')
                    .set('Accept', 'application/json')
                    .send({
                        data: params.reduce((acc, param) => {
                            acc[param] = 'data';
                            return acc;
                        }, {})
                    });
                expect(response.status).toBe(400);
                expect(response.body.error).toBeDefined();
                requiredParameters.filter(x => !params.includes(x))
                    .forEach(param => expect(response.body.error).toContain(param));

            })
        })
    })

    describe("POST to /users creates a new account", () => {
        let newUser;
        test('response body includes success message', async () => {
            await knex.seed.run();
            const response = await supertest(app)
                .post('/users/')
                .set('Accept', 'application/json')
                .send({
                    data: {
                        username: 'username',
                        email: 'email',
                        password: 'password'
                    }
                });
            expect(response.body.data).toBeDefined();
            newUser = await service.read(response.body.data.userId);
            expect(response.body.error).toBeUndefined();
            expect(response.body.data.message).toBe('success');
        })

        // Validate the new user exists in database
        test('new user exists in database', async () => {
            const response = await supertest(app).get(`/users/${newUser[0].id}`);
            expect(response.body.error).toBeUndefined();
            expect(response.body.data[0].id).toBe(newUser[0].id)
        })

    })

})

