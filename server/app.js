'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const api = require('../routes/api');

app.use(morgan('dev')); //logging middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public'))); //serving up static files (e.g. css files)
app.use('/api', api);

//error handling middleware - MUST have all 4 parameters
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Error');
});

app.listen(3001, function() {
  console.log("Server is listening on port 3001!");
});

module.exports = app;
