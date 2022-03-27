const supertest = require('supertest');
const  usersRouter = require('../src/users/users.router');
const makeTestApp = require("./makeTestApp");

describe("users route", () => {
    const app = makeTestApp('/users', usersRouter);
    it("GET /:userId returns 404 if user does not exist" , async () => {
        const userId = 1337;
        await supertest(app).get(`/users/${userId}`).expect(404);
    })
})