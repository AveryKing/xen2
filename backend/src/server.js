require('dotenv').config();
const express = require('express');
const app = express();

const { EXPRESS_PORT } = process.env || 8080;

app.listen(EXPRESS_PORT, () => {
    console.log(`Express running on port ${EXPRESS_PORT}`);
});

module.exports = app;