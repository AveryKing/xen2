const express = require("express");
const cors = require('cors');
const notFound = require("../src/errors/notFound");
const genericError = require('../src/errors/genericError');

function makeTestApp(path, router) {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(path, router);
    app.use(notFound);
    app.use(genericError);
    return app;
}

module.exports = makeTestApp;