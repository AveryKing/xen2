require('dotenv').config();
const express = require('express');
const app = express();

const { EXPRESS_PORT } = process.env || 8080;
//const EXPRESS_PORT = 1337;
app.listen(EXPRESS_PORT, () => {
    console.log(`Express running on port ${EXPRESS_PORT}`);
});

module.exports = app;