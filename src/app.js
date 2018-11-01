const { configure } = require('./conf');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const app = express();

const { server } = configure;
for (const key of Object.keys(server)) {
  app.set(key, server[key]);
}

app.use(helmet());

app.get('/', express.urlencoded({ extended: true }), (req, res) => {
  res.end(`
  <h1>Hello, world</h1>
  `);
});

module.exports = app;
