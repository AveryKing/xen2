const app = require('./server');
const cors = require('cors');
const express = require('express');
app.use(express.json())
app.use(cors());

const usersRouter = require('./users/users.router');

app.use('/users', usersRouter);