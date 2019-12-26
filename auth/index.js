'use strict';
// auth权限主路由
var express = require('express');
var passport = require('passport');
var config = require('../config');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var auth = require('./auth.service');

// Passport Configuration
require('./local/passport').setupSignup(User, config);
require('./local/passport').setupLogin(User, config);

var router = express.Router();
// 引入local本地验证策略路由
router.use('/local', require('./local'));

module.exports = router;