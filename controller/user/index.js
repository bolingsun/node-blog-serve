'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// 用户注册
router.post('/register',controller.userRegister);

module.exports = router;