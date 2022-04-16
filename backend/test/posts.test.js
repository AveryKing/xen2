require('dotenv').config();
const supertest = require('supertest');
const postsRouter = require('../src/posts/posts.router');
const makeTestApp = require("./makeTestApp");
const service = require('../src/posts/posts.service');
const app = makeTestApp('/posts', postsRouter);
const knex = require('../src/db/connection')
const testPostData = require("../src/db/config/testPostData");
jest.setTimeout(100000);

function makePost(content = {}) {
    return supertest(app)
        .post('/posts')
        .set('Accept', 'application/json')
        .send(content);
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
        supertest(app).get(`/posts/${postId}`)
            .then(res => {
                expect(res.status).toBe(404);
                expect(res.body.error).toBeDefined();
                expect(res.body.error).toContain('not found');
            });

    })

    test("GET /:postId returns post if it exists", async () => {
        const postId = testPostData[0].id;
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
        content:'The quick brown fox jumped over the lazy dog.'
    }


        test("data required in request.body", async () => {
            makePost()
                .then(res => {
                    expect(res.body.error).toBeDefined();
                    expect(res.body.error).toBe('Request body is malformed');
                })
        })
        const requiredParams = ['title', 'content'];
        requiredParams.forEach(param => {
            test(`${param} parameter required`, async () => {
                const params = requiredParams.filter(x => x !== param);
                 makePost({
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
                makePost({
                    [curr.param]: 'x'.repeat(lengthTest.min - 1),
                    ...lengthTest.other
                })
                    .then(res => {
                        expect(res.status).toBe(400);
                        expect(res.body.error).toBeDefined();
                        expect(res.body.error).toContain(curr.replace(/^\w/, c => c.toUpperCase()));
                    })
            })
        })
    test('posts are successfully inserted to database', async () => {
        const post = {
            data: validPost
        }
         makePost(post)
            .then(res => {
                expect(res.status).toBe(201);
                expect(res.body.data).toBeDefined();
                expect(res.body.data[0].title).toBe(post.title);
                expect(res.body.data[0].content).toBe(post.content);
            })
})
});
