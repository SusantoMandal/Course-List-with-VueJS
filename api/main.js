/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./controllers/index');

const app = express();
app.use(express.static(path.join(__dirname, 'views/course')));
app.use(cors());
app.use(express.json());
app.use('/', routes);

app.listen(5000, () => {
  console.log('listening from port 5000');
});
