require('dotenv').config();
const supertest = require('supertest');
const usersRouter = require('../src/posts/posts.router');
const makeTestApp = require("./makeTestApp");
const service = require('../src/posts/posts.service');
const app = makeTestApp('/posts', postsRouter);
const knex = require('../src/db/connection')
const jwt = require('jsonwebtoken');

describe('create', () => {
    test('should create a post', async () => {
        const user = await knex('users').first();
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        const response = await supertest(app)
            .post('/')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'test',
                content: 'test',
                userId: user.id
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('test');
        expect(response.body.content).toBe('test');
        expect(response.body.userId).toBe(user.id);
    });
})

describe('fetch a single post', () => {
test('should fetch a single post', async () => {
    const user = await knex('users').first();
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    const post = await service.create({
        title: 'test',
        content: 'test',
        userId: user.id
    });
    const response = await supertest(app)
        .get(`/${post.id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('test');
    expect(response.body.content).toBe('test');
    expect(response.body.userId).toBe(user.id);
});
})

describe('list', () => {
    test('should get all posts', async () => {
        const response = await supertest(app)
            .get('/');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('posts');
        expect(response.body.posts).toHaveLength(1);
    });
})

describe('delete', () => {
    test('should delete a post', async () => {
        const user = await knex('users').first();
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        const post = await service.create({
            title: 'test',
            content: 'test',
            userId: user.id
        });
        const response = await supertest(app)
            .delete(`/${post.id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('test');
        expect(response.body.content).toBe('test');
        expect(response.body.userId).toBe(user.id);
    });
})