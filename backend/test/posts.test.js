require('dotenv').config();
const supertest = require('supertest');
const postsRouter = require('../src/posts/posts.router');
const makeTestApp = require("./makeTestApp");
const service = require('../src/posts/posts.service');
const app = makeTestApp('/posts', postsRouter);
const knex = require('../src/db/connection')
const testPostData = require("../src/db/config/testPostData");
jest.setTimeout(100000);

function makePost(auth = null, content = {}) {
    if (auth) {
        return supertest(app)
            .post('/posts')
            .set('Authorization', `Bearer ${auth}`)
            .send(content);
    } else {
        return supertest(app)
            .post('/posts')
            .set('Accept', 'application/json')
            .send(content);
    }


}

function readPost(postId) {
    return supertest(app)
        .get(`/posts/${postId}`);
}

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
        await readPost(postId)
            .then(res => {
                expect(res.status).toBe(404);
                expect(res.body.error).toBeDefined();
                expect(res.body.error).toContain('not found');
            });

    })

    test("GET /:postId returns post if it exists", async () => {
        const postId = 1;
        supertest(app).get(`/posts/${postId}`)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body.data).toBeDefined();
                expect(res.body.data[0].content).toBe(testPostData[0].content);
            })

    });
})

describe("create", () => {
    const validPost = {
        title: 'Hello, World!',
        content: 'The quick brown fox jumped over the lazy dog.'
    }

    test("auth token cannot be missing", async () => {
        await makePost('', {data: validPost})
            .then(res => {
                expect(res.status).toBe(401);
                expect(res.body.error).toBeDefined();
                expect(res.body.error).toContain('token');
            })
    });

    test('auth token must be valid', async () => {
        await makePost('invalid', {data: validPost})
            .then(res => {
                expect(res.status).toBe(401);
                expect(res.body.error).toBeDefined();
                expect(res.body.error).toContain('token');
            })
    })

    test("data required in request.body", async () => {
        await makePost('debug')
            .then(res => {
                expect(res.body.error).toBeDefined();
                expect(res.body.error).toBe('Request body is malformed');
            })
    })
    const requiredParams = ['title', 'content'];
    requiredParams.forEach(param => {
        test(`${param} parameter required`, async () => {
            const params = requiredParams.filter(x => x !== param);
            await makePost('debug', {
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

    //TODO: implement max length validation
    const lengthTests = [
        {param: 'title', min: 6, other: {content: 'super cool post content xD'}},
        {param: 'content', min: 20, other: {title: 'hello, world!'}}
    ]

    lengthTests.forEach(lengthTest => {
        const curr = lengthTest.param;
        test(`${curr} must be at least ${lengthTest.min} characters`, async () => {
            await makePost('debug', {
                data: {
                    [curr]: 'x'.repeat(lengthTest.min - 1),
                    ...lengthTest.other
                }

            })
                .then(res => {
                    expect(res.status).toBe(400);
                    expect(res.body.error).toBeDefined();
                    expect(res.body.error).toContain(curr.replace(/^\w/, c => c.toUpperCase()));
                })
        })
    })

    test('new posts are inserted into database', async () => {
        const post = {
            data: validPost
        }
        await makePost('debug', post)
            .then(res => {
                expect(res.status).toBe(201);
                expect(res.body.title).toBe(validPost.title);
                expect(res.body.content).toBe(validPost.content);
                return res.body;
            })
            .then(async newPost => {
                await readPost(newPost.id)
                    .then(res => {
                        expect(res.status).toBe(200);
                        expect(res.body.data).toBeDefined();
                        expect(res.body.data[0].title).toBe(newPost.title);
                        expect(res.body.data[0].content).toBe(newPost.content);
                    })
            })
    })
})