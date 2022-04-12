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
            describe('username validation', () => {
                const usernameDatasets = [
                    {test: 'username cannot be empty', value: ''},
                    {test: 'username cannot be less than 3 characters', value: '12'},
                    {test: 'username cannot be greater than 10 characters', value: 'qwertyuiopasdfgh'},
                    {test: 'username must be unique', value: testUserData[0].username},
                ]
                for(let i of usernameDatasets) {
                    test(i.test, async () => {
                        const response = await supertest(app)
                            .post('/users')
                            .set('Accept', 'application/json')
                            .send({
                                data: {
                                    username: i.value,
                                    email:'test@gmail.com',
                                    password:'iamapassword'
                                },
                            });
                        expect(response.status).toBe(400);
                        expect(response.body.error).toBeDefined();
                        expect(response.body.error).toContain('username');
                    })
                }
            })

        describe('email validation', () => {
            const emailDatasets = [
                {test: 'email must be unique', value: testUserData[0].email},
                {test: 'email must be valid format', value: "not@valid"},
                {test: 'email cannot be empty', value: ""}
            ]
            for(let i of emailDatasets) {
                test(i.test, async () => {
                    const response = await supertest(app)
                        .post('/users')
                        .set('Accept', 'application/json')
                        .send({
                            data: {
                                email: i.value,
                                username:`testuser`,
                                password:'iamapassword'
                            },
                        });
                    expect(response.status).toBe(400);
                    expect(response.body.error).toBeDefined();
                    expect(response.body.error).toContain('email');
                })
            }
        })

        describe('password validation', () => {
            test('password must be at least 6 characters' , async () => {
                const response = await supertest(app)
                    .post('/users')
                    .set('Accept', 'application/json')
                    .send({
                        data: {
                            email:'email@me.com',
                            username:'username12',
                            password:'123'
                        }
                    })
                expect(response.status).toBe(400);
                expect(response.body.error).toBeDefined();
                expect(response.body.error).toContain('6 characters')
            })
        })

    })

    describe("POST to /users creates a new account", () => {
        let newUser;
        const newUserPassword = 'pass123'
        test('response body includes success message', async () => {
            await knex.seed.run();
            const response = await supertest(app)
                .post('/users')
                .set('Accept', 'application/json')
                .send({
                    data: {
                        username: 'username',
                        email: 'email@email.com',
                        password: newUserPassword
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

            /**TODO: FIX
        test('password hashed successfully', async () => {
            expect(await service.validatePassword(newUser[0].username,newUserPassword)).toBeTruthy();

        })
             */

    })

})

describe('login', () => {
    const badCases = [
        {test:'Non-existent username returns error', username:'ejnoen',password:'123456',includes:'error'},
        {test:'Invalid password returns error', username:testUserData[0].username,password:'123456',includes:'error'},
    ]
    for(let i in badCases) {
        test(badCases[i].test, async () => {
            const response = await supertest(app).post('/users/login')
                .set('Accept', 'application/json')
                .send({
                    data: {
                        username: badCases[i].username,
                        password: badCases[i].password
                    }
                });
            expect(response.status).toBe(401);
            expect(response.body.error).toBeDefined();
            expect(response.body.error).toContain(badCases[i].includes);

        })
    }

    test('Valid login returns JWT', async () => {
        const response = await supertest(app).post('/users/login')
            .set('Accept', 'application/json')
            .send({
                data: {
                    username: testUserData[0].username,
                    password: "amy"
                }
            });
        expect(response.status).toBe(200);
        expect(response.body.error).toBeUndefined();
        expect(response.body.data.token).toBeDefined();
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


describe('list', () => {
    test('GET / returns a list of all users', async () => {
        await knex.seed.run()
        const {body: {data}} = await supertest(app).get('/users');
        for (let i in testUserData) {
            expect(data[i].username).toEqual(testUserData[i].username);
        }

    })
})