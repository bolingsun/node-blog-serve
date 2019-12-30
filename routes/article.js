/**
 * 博客文章路由
 */
var express = require('express');
var router = express.Router();
var auth = require('../auth/auth.service'); // 用户鉴权
var config = require('../config');
import articleController from '../controller/article.controller'
// 添加文章
router.post('/addArticle',auth.hasRole('admin'),articleController.addArticle);

module.exports = router;