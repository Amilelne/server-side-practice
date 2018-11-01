const { configure } = require('./conf');
const express = require('express');
const exphbs = require('express-handlebars');
const helmet = require('helmet');
const path = require('path');
const mongoose = require('./mongoose');
const app = express();
const { Record } = require('./models/record.model');

mongoose.connect(mongoose.get('db_url'));

const { server } = configure;
for (const key of Object.keys(server)) {
  app.set(key, server[key]);
}

app.use(helmet());

// handlebars engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  let records = getRecords();
  res.render('home', { records });
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/add', express.urlencoded({ extended: true }), (req, res) => {
  addRecord(req, res);
  res.redirect('/');
});
async function getRecords() {
  let records = await Record.find();
  return records;
}
async function addRecord(req, res) {
  let date = new Date(req.body.date);
  let weight = req.body.weight;
  let input = { date, weight };
  let record = await new Record(input).save();
}
module.exports = app;
