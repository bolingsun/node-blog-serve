/**
 * 博客文章标签和标签分类路由
 */
var express = require('express');
var router = express.Router();
var auth = require('../auth/auth.service'); // 用户鉴权
var config = require('../config');
import tagController from '../controller/tags.controller'
// 添加标签分类
router.post('/addTagClass',auth.hasRole('admin'),tagController.addTagCat);

// 获取标签分类列表
router.get('/tagClassList',auth.hasRole('admin'),tagController.getTagCatList);

// 更新标签分类
router.post('/updateTagClass',auth.hasRole('admin'),tagController.updateTagCat);

// 删除标签分类
router.post('/deleteTagClass',auth.hasRole('admin'),tagController.deleteTagCat);

// 获取标签列表
router.post('/tagList',auth.hasRole('admin'),tagController.getTagList);

// 新增标签
router.post('/addTag',auth.hasRole('admin'),tagController.addTag);

// 删除标签
router.post('/deleteTag',auth.hasRole('admin'),tagController.deleteTag);

// 更新标签
router.post('/updateTag',auth.hasRole('admin'),tagController.updateTag);

//前台获取标签列表(前台)
router.get('/frontTagList',tagController.getFrontTagList);

module.exports = router;