'use strict';
/**
 * 博客文章控制层
 */
var _ = require('lodash');
var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');
var path = require('path');
// var URL = require('url');
// var MarkdownIt = require('markdown-it');
var config = require('../config');
var Promise = require("bluebird");
var tools = require('../util/tools');

//添加博客
exports.addArticle = function (req,res,next) {
	var content = req.body.content;
	var title = req.body.title;
	var error_msg;
	if(!title){
		error_msg = '标题不能为空.';
	}else if(!content){
		error_msg = '内容不能为空.';
	}
	if(error_msg){
		return res.status(422).send({status: 0,error_msg:error_msg});
	}
	//将图片提取存入images,缩略图调用
	req.body.images = tools.extractImage(content);
	return Article.createAsync(req.body).then(function (result) {
		return res.status(200).send({status: 1,article_id:result._id, message: '新增成功'});
	}).catch(function (err) {
		 // return next(err);
		 return res.status(200).send({status: 0,error_msg:err.errmsg})
	});
}
//后台获取博客列表
exports.getArticleList = function (req,res,next) {
	var currentPage = (parseInt(req.query.currentPage) > 0)?parseInt(req.query.currentPage):1;
	var pageSize = (parseInt(req.query.pageSize) > 0)?parseInt(req.query.pageSize):10;
	var startRow = (currentPage - 1) * pageSize;

	var sortName = String(req.query.sortName) || "publish_time";
	var sortOrder = req.query.sortOrder;
	if(sortOrder === 'false'){
		sortName = "-" + sortName;
	}

	Article.find({},'-images')
		.skip(startRow)
		.limit(pageSize)
		.sort(sortName)
		.exec().then(function (ArticleList) {
			return Article.countAsync().then(function (count) {
				return res.status(200).send({status: 1, data: ArticleList, total:count });
			});
		}).then(null,function (err) {
			return next(err);
		});
}

//删除博客(连同这篇文章的评论一起删除.)
exports.destroy = function (req,res,next) {
	var id = req.params.id;
	Article.findByIdAndRemoveAsync(id).then(function() {
		return Comment.removeAsync({aid:id}).then(function () {
			return res.status(200).send({success: true});
		});
	}).catch(function (err) {
		return next(err);
	});
}
//更新博客
exports.updateArticle = function (req,res,next) {
	var id = req.body.id;
	if(req.body._id){
	  delete req.body._id;
	}
	var content = req.body.content;
	var title = req.body.title;
	var error_msg;
	if(!title){
		error_msg = '标题不能为空.';
	}else if(!content){
		error_msg = '内容不能为空.';
	}
	if(error_msg){
		return res.status(422).send({status: 0, error_msg:error_msg});
	}
	//将图片提取存入images,缩略图调用
	req.body.images = tools.extractImage(content);
	req.body.updated = new Date();
	if(req.body.isRePub){
		req.body.publish_time = new Date();
	}

	Article.findByIdAndUpdateAsync(id,req.body,{new:true}).then(function(article){
		return res.status(200).send({status: 1, success:true,message: '更新成功', article_id:article._id});
	}).catch(function(err){
		return next(err);
	});
}
//后台获取单篇博客详情(未)
exports.getArticle = function (req,res) {
	var id = req.params.id;
	Article.findOne({_id:id})
		.populate('tags')
		.exec().then(function (article) {
			return res.status(200).json({data:article});
		}).then(null,function (err) {
			return res.status(500).send();
		});
}
//前台获取博客列表(包含博客数量)
exports.getFrontArticleList =function (req,res,next) {
	var currentPage = (parseInt(req.query.currentPage) > 0)?parseInt(req.query.currentPage):1;
	var pageSize = (parseInt(req.query.pageSize) > 0)?parseInt(req.query.pageSize):10;
	var startRow = (currentPage - 1) * pageSize;
	var sort = String(req.query.sortName) || "publish_time";
	sort = "-" + sort;
	// var condition = {status:{$gt:0}}; // 筛选状态
	var condition = {};
	if(req.query.tagId){
		//tagId = new mongoose.Types.ObjectId(tagId);
		var tagId = String(req.query.tagId);
		condition = _.defaults(condition,{ tags: { $elemMatch: { $eq:tagId } } });		
	}
	Article.count(condition).then((count) => {
		Article.find(condition)
		.select('title brief cover_img visit_count comment_count like_count publish_time')
		.skip(startRow)
		.limit(pageSize)
		.sort(sort)
		.exec().then(function (list) {
			return res.status(200).send({status: 1, data:list, total: count});
		}).then(null,function (err) {
			return next(err);
		});
	})
}

//前台获取文章详情
exports.getFrontArticle = function (req,res,next) {
	var id = req.query.id;
	//每次获取之后,将阅读数加1
	return Article.findByIdAsync(id,'-images').then(function(result) {
		result.visit_count++;
		Article.findByIdAndUpdateAsync(id,{$inc:{visit_count:1}});
		return res.status(200).send({status: 1, data:result.info});
	}).catch(function (err) {
		return next(err);
	});

}
//前台获取上一篇和下一篇
exports.getPrenext = function (req,res,next) {
	var id = req.params.id;
	var sort = String(req.query.sortName) || "publish_time";
	var preCondition,nextCondition;
	preCondition = {status:{$gt:0}};
	nextCondition = {status:{$gt:0}};
	if(req.query.tagId){
		//tagId = new mongoose.Types.ObjectId(tagId);
		var tagId = String(req.query.tagId);
		preCondition =  _.defaults(preCondition,{ tags: { $elemMatch: { $eq:tagId } } });
		nextCondition =  _.defaults(nextCondition,{ tags: { $elemMatch: { $eq:tagId } } });
	}
	Article.findByIdAsync(id).then(function (article) {
		//先获取文章,
		if(sort === 'visit_count'){
			preCondition = _.defaults(preCondition,{'_id':{$ne:id},'visit_count':{'$lte':article.visit_count}});
			nextCondition = _.defaults(nextCondition,{'_id':{$ne:id},'visit_count':{'$gte':article.visit_count}});
		}else{
			preCondition = _.defaults(preCondition,{'_id':{$ne:id},'publish_time':{'$lte':article.publish_time}});
			nextCondition = _.defaults(nextCondition,{'_id':{$ne:id},'publish_time':{'$gte':article.publish_time}});
		}
		var prePromise = Article.find(preCondition)
			.select('title')
			.limit(1)
			.sort('-' + sort)
			.exec();

		var nextPromise = Article.find(nextCondition)
				.select('title')
				.limit(1)
				.sort(sort)
				.exec();
		prePromise.then(function (preResult) {
			var prev = preResult[0] || {};
			return nextPromise.then(function (nextResult) {
				var next = nextResult[0] || {};
				return {'next':next,'prev':prev};
			})
		}).then(function (result) {
			return res.status(200).json({data:result});
		})
	}).catch(function (err) {
		return next(err);
	})
}


//用户喜欢
exports.toggleLike = function (req,res,next) {
	var aid = new mongoose.Types.ObjectId(req.body.id);
  var userId = req.user._id;
  //如果已经喜欢过了,则从喜欢列表里,去掉文章ID,并减少文章喜欢数.否则添加到喜欢列表,并增加文章喜欢数.	
	//var isLink = _.indexOf(req.user.likeList.toString(), req.params.id);
  var isLike = _.findIndex(req.user.likeList, function(item) {
    return item.toString() == req.body.id;
  });
  var conditionOne,conditionTwo,liked;
  if(isLike !== -1){
  	conditionOne = {'$pull':{'likeList':aid}};
  	conditionTwo = {'$inc':{'like_count':-1}};
  	liked = false;
  }else{
  	conditionOne = {'$addToSet':{'likeList':aid}};
  	conditionTwo = {'$inc':{'like_count':1}};
  	liked = true;
  }

  User.findByIdAndUpdateAsync(userId,conditionOne).then(function (user) {
  	return Article.findByIdAndUpdateAsync(aid,conditionTwo,{new:true}).then(function (article) {
  		return res.status(200).send({
				status: 1, 
				data: {
					count: article.like_count,
					isLike: liked
				}
			});
  	});
  }).catch(function (err) {
  	return next(err);
  });
}