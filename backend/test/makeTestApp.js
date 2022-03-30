const express = require("express");
const cors = require('cors');
const notFound = require("../src/errors/notFound");
const errorHandler = require('../src/errors/errorHandler');

function makeTestApp(path, router) {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(path, router);
    app.use(notFound);
    app.use(errorHandler);
    return app;
}

module.exports = makeTestApp;