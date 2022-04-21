require('dotenv').config();
const supertest = require('supertest');
const commentsRouter = require('../src/comments/comments.router');
const makeTestApp = require("./makeTestApp");
const service = require('../src/comments/comments.service');
const app = makeTestApp('/comments', commentsRouter);
const knex = require('../src/db/connection');
const testCommentData = require("../src/db/config/testCommentData");
const {load} = require("nodemon/lib/rules");
jest.setTimeout(100000);

describe('list', () => {
    test('GET /:postId returns relevant comments', async () => {
        await knex.seed.run();
        await supertest(app)
            .get('/comments/2')
            .then(res => {
                expect(res.body.comments.length).toBe(testCommentData.filter(x => x.post === 2).length);
                for (let comment of res.body.comments) {
                    expect(testCommentData.some(x => x.content === comment.content)).toBe(true);
                }
            })
    })
})

describe('read', () => {
    test('GET /:postId/:commentId returns a comment', async () => {
        await supertest(app)
            .get(`/comments/1/1`)
            .then(res => {
                expect(res.body.error).toBeUndefined();
                expect(res.body.comment).toBeDefined();
                expect(res.body.comment.content).toBe(testCommentData[0].content);
                expect(res.body.comment.creator).toBe(testCommentData[0].creator);
                expect(res.body.comment.post).toBe(testCommentData[0].post);
            })
    })
    test('404 returned for non-existent comment', async () => {
        await supertest(app)
            .get(`/comments/1/99999`)
            .then(res => {
                expect(res.body.error).toBeDefined();
                expect(res.status).toBe(404);
                expect(res.body.error).toBe('Comment not found');
            })
    })
})

describe('create', () => {
    test('valid jwt required to post comment', async () => {
        await supertest(app)
            .post('/comments/1')
            .set('Authorization', 'Bearer invalid')
            .send({
                data: {
                    content: "test comment"
                }
            })
            .then(res => {
                expect(res.body.error).toBeDefined();
                expect(res.status).toBe(401);
                expect(res.body.error).toBe("Invalid token");
            })
    })
    test('content must be defined', async () => {
        await supertest(app)
            .post('/comments/1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer debug`)
            .send({data: {}})
            .then(res => {
                expect(res.body.error).toBeDefined();
                expect(res.status).toBe(400);
                expect(res.body.error).toBe("You cannot post an empty comment");
            })
    })
    test('comments must be at least 5 characters', async () => {
        await supertest(app)
            .post('/comments/1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer debug`)
            .send({
                data: {
                    content: 'ope',
                }
            })
            .then(res => {
                expect(res.body.error).toBeDefined();
                expect(res.status).toBe(400);
                expect(res.body.error).toBe('Comment must be at least 5 characters');
            })
    })

    test('comments are successfully inserted into db', async () => {
        await supertest(app)
            .post('/comments/1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer debug`)
            .send({
                data: {
                    content: 'test comment',
                }
            })
            .then(res => {
                expect(res.body.error).toBeUndefined();
                expect(res.status).toBe(201);
                expect(res.body.comment).toBeDefined();
                return res.body.comment
            })
            .then(async comment => {
                await supertest(app)
                    .get(`/comments/1/${comment.id}`)
                    .then(res => {
                        expect(res.body.comment).toBeDefined();
                        expect(res.body.error).toBeUndefined();
                        expect(res.body.comment.content).toBe(comment.content);
                        expect(res.body.comment.creator).toBe(comment.creator);
                        expect(res.body.comment.post).toBe(comment.post);
                    })
            })
    })
})

