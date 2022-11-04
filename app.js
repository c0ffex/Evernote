const express = require('express');
const path = require('path');
const logger = require('morgan');
require('dotenv')

const usersRouter = require('./app/routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);

module.exports = app;
