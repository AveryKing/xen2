const app = require('./server');
const cors = require('cors');
const express = require('express');
const notFound = require('./errors/notFound');
const genericError = require('./errors/genericError');

app.use(express.json())
app.use(cors());

// Express router definitions
const usersRouter = require('./users/users.router');

// Express routes
app.use('/users', usersRouter);

// Error handlers
app.use(notFound);
app.use(genericError);