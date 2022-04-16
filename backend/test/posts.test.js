require('dotenv').config();
const supertest = require('supertest');
const postsRouter = require('../src/posts/posts.router');
const makeTestApp = require("./makeTestApp");
const service = require('../src/posts/posts.service');
const app = makeTestApp('/posts', postsRouter);
const knex = require('../src/db/connection')
const jwt = require('jsonwebtoken');
const testPostData = require("../src/db/config/testPostData");
const testUserData = require("../src/db/config/testUserData");

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

describe("create", () => {
    function makePost(content = {}) {
        return supertest(app)
            .post('/posts')
            .set('Accept', 'application/json')
            .send(content);
    }

    describe('request validation', () => {
        test("data required in request.body", async () => {
            makePost()
                .then(res => {
                    expect(res.body.error).toBeDefined();
                    expect(res.body.error).toBe('Request body is malformed');
                })
        })
    });
    const requiredParams = ['title', 'content'];
    requiredParams.forEach(param => {
        test(`${param} parameter required`, async () => {
            const params = requiredParams.filter(x => x !== param);
            await makePost({
                data: params.reduce((acc, param) => {
                    acc[param] = 'data';
                    return acc;
                }, {})
            })
                .then(res => {
                    expect(res.status).toBe(400);
                    expect(res.body.error).toBeDefined();
                    requiredParams.filter(x => !params.includes(x))
                        .forEach(param => expect(res.body.error).toContain(param));
                })
        })
    })
})