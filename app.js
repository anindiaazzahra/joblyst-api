const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser= require('body-parser');
const config = require('./config'); 

const authRouter = require("./app/Authentication/route");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const customErrorHandler = require("./middleware/customErrorHandler");
const handler404NotFound = require("./middleware/handler404NotFound");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());

app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(customErrorHandler);
app.use(handler404NotFound);


module.exports = app;
