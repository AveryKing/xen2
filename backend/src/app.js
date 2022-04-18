const app = require('./server');
const cors = require('cors');
const express = require('express');
const notFound = require('./errors/notFound');
const errorHandler = require('./errors/errorHandler');

app.use(express.json())
app.use(cors());

// Express router definitions
const usersRouter = require('./users/users.router');
const postsRouter = require('./posts/posts.router');
const commentsRouter = require('./comments/comments.router');

// Express routes
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

// Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;