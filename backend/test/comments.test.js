require('dotenv').config();
const supertest = require('supertest');
const postsRouter = require('../src/posts/posts.router');
const makeTestApp = require("./makeTestApp");
const service = require('../src/posts/posts.service');
const app = makeTestApp('/posts', postsRouter);
const knex = require('../src/db/connection');
const testPostData = require("../src/db/config/testPostData");
const {load} = require("nodemon/lib/rules");
jest.setTimeout(100000);

describe('list', () => {
    test('GET /:postId returns all comments', async () => {

    })
    test('Comments are relevant to queried post', async () => {

    })
})

describe('read', () => {
    test('GET /:postId/:commentId returns a comment', async () => {

    })
})