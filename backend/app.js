const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/auth');
const jwt = require('jsonwebtoken');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const restRouter = require('./routes/restaurants');
const smsAuthRouter = require('./routes/smsAuth');
const infoRouter = require('./routes/info');
const userInfoRouter = require('./routes/userInfo');

const app = express();

const models = require("./models/index");

models.sequelize.sync().then(() => {
  console.log("DB is connected successfully");
}).catch(err => {
  console.log("DB is not connected because of below reason");
  console.log(err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS 허용하기
app.use(cors());

app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/sms-auth', smsAuthRouter);
app.use('/api/info', infoRouter);
app.use('/api/*', authMiddleware);
// app.use('/api/users', usersRouter);
app.use('/api/user-info', userInfoRouter);
app.use('/api/restaurants', restRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
