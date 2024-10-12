const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser= require('body-parser');

const authRouter = require("./app/Authentication/route");
const userRouter = require("./app/User/route");
const jobRouter = require("./app/Job/route");
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
app.use('/user', userRouter);
app.use('/job', jobRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'test' });
});

app.use(customErrorHandler);
app.use(handler404NotFound);


module.exports = app;
