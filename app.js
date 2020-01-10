'use strict';
// 设置默认环境变量
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var fs = require('fs');
var session = require('express-session');
var passport = require('passport');
var config = require('./config');
var bodyParser = require('body-parser');
var cors = require('cors');
import connectMongo from 'connect-mongo';

// 设置连接数据库
// 连接数据库.
// mongoose.connect(config.mongo.uri, config.mongo.options);
// mongoose.Promise = global.Promise;
require('./mongodb/db');
var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});

var app = express();

app.use(bodyParser.json({"limit":"10000kb"})); // 请求body设置10M大小
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 跨域设置测试
// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', '*');
//   next();
// });
// 跨域设置上线
app.use(cors({
  origin:['http://localhost:8081'],
  methods:['GET','POST'],  //指定接收的请求类型
  credentials: true,
  alloweHeaders:['Content-Type','Authorization']  //指定header
}))
// 跨域设置上传文件


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const MongoStore = connectMongo(session);
app.use(session({
  name: config.session.name,
  secret: config.session.secrets,
  cookie: config.session.cookie,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: config.mongo.uri
  })
}));

// 加载passport验证初始化
app.use(passport.initialize());
// 加载路由
require('./routes')(app);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
