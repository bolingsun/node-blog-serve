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
// 后台获取文章列表
router.get('/adminArticleList',auth.hasRole('admin'),articleController.getArticleList);
// 后台更新文章
router.post('/updateArticle',auth.hasRole('admin'),articleController.updateArticle);
// 后台获取文章详情
router.post('/adminArticleDetail',auth.hasRole('admin'),articleController.getArticle);
// 后台删除文章
router.post('/delete',auth.hasRole('admin'),articleController.deleteArticle);

// 前台用户获取文章列表
router.get('/articleList',articleController.getFrontArticleList);

// 前台用户获取文章列表
router.get('/articleDetial',articleController.getFrontArticle);

// 用户喜欢文章
router.post('/toggleLike',auth.isAuthenticated(), articleController.toggleLike);

module.exports = router;