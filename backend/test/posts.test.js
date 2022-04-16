require('dotenv').config();
const supertest = require('supertest');
const postsRouter = require('../src/posts/posts.router');
const makeTestApp = require("./makeTestApp");
const service = require('../src/posts/posts.service');
const app = makeTestApp('/posts', postsRouter);
const knex = require('../src/db/connection')
const jwt = require('jsonwebtoken');
const testPostData = require("../src/db/config/testPostData");

describe('list', () => {
    test('should return all posts', async () => {
        await knex.seed.run();
        const {body: {data}} = await supertest(app).get('/posts');
        for (let i in testPostData) {
            expect(data[i].content).toEqual(testPostData[i].content);
        }
    });
})

describe('read', () => {
    test("GET /:postId returns 404 if post does not exist", async () => {
        const postId = 99999;
        const response = await supertest(app).get(`/posts/${postId}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toContain('not found');
    });

    test("GET /:postId returns post if it exists", async () => {
        const postId = testPostData[0].id;
        const response = await supertest(app).get(`/posts/${postId}`);
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
        console.log(response.body.data)
        expect(response.body.data[0].content).toBe(testPostData[0].content);
    });
})