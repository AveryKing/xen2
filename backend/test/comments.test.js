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
            for(let comment of res.body.comments) {
                expect(testCommentData.some(x => x.content === comment.content)).toBe(true);
            }
        })
    })})

describe('read', () => {
    test('GET /:postId/:commentId returns a comment', async () => {
        await supertest(app)
        .get(`/comments/1/1`)
        .then(res => {
            console.log(res.body);
            expect(res.body.error).toBeUndefined();
            expect(res.body.comment).toBeDefined();
            expect(res.body.comment.content).toBe(testCommentData[0].content);
            expect(res.body.comment.creator).toBe(testCommentData[0].creator);
            expect(res.body.comment.post).toBe(testCommentData[0].post);
    })
    })
})