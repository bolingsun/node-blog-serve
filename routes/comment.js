/**
 * 博客文章评论路由
 */
var express = require('express');
var router = express.Router();
var auth = require('../auth/auth.service'); // 用户鉴权
var config = require('../config');
import commentController from '../controller/comment.controller'
// 添加评论
router.post('/addComment',auth.isAuthenticated(),commentController.addComment);
// 获取评论列表(前台)
router.get('/commentList',commentController.getFrontCommentList);
// 评论回复
router.post('/addReply',auth.isAuthenticated(),commentController.addReply);
// 删除评论回复
router.post('/deleteReply',auth.hasRole('admin'),commentController.deleteReply);
// 删除评论回复
router.post('/deleteComment',auth.hasRole('admin'),commentController.deleteComment);
module.exports = router;