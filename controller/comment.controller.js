'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Article = mongoose.model('Article');

//添加新的评论.
exports.addComment = function (req,res,next) {
	var article_id = req.body.articleId;
	var content = req.body.content;
	var userId = req.user._id;
  var error_msg;
	if(!article_id){
		error_msg = '缺少必须参数';
	}else if(!content || content == ''){
		error_msg = "评论内容不能为空";
	}
	if(error_msg){
		return res.status(422).send({status: 0, error_msg:error_msg});
	}
	Comment.createAsync({
		article_id:article_id,
		content:content,
		user_id:userId
	}).then(function (result) {
		var comment = result.toObject();
		comment.user_id = {
			_id:req.user._id,
      nickname:req.user.nickname,
      username:req.user.username,
			avatar:req.user.avatar
		}
		Article.findByIdAndUpdateAsync(article_id,{$inc:{comment_count:1}});
		return res.status(200).send({status: 1, success:true,data:comment});
	}).catch(function (err) {
		return next(err);
	});
}

//获取评论列表
exports.getFrontCommentList = function (req,res,next) {
	var article_id = req.query.id;
	Comment.find({article_id:article_id,status:{$eq:1}})
	.sort('created')
	.populate({
		path: 'user_id',
		select: 'nickname username avatar'
	})
	.exec().then(function (commentList) {
		return res.status(200).send({status: 1, data:commentList});
	}).then(null,function (err) {
		return next(err);
	});
}

//添加评论回复
exports.addReply = function (req,res,next) {
	var cid = req.body.id;
	if(!req.body.content || req.body.content == ''){
		return res.status(422).send({error_msg:"回复内容不能为空"});
	}
	var reply = req.body;
  reply.user_info = {
  	id:req.user._id,
    nickname:req.user.nickname,
    username:req.user.username
  }
  reply.created = new Date();
	Comment.findByIdAndUpdateAsync(cid,{"$push":{"replys":reply}},{new:true}).then(function (result) {
		return res.status(200).send({status: 1,success:true, message: "回复成功", data:result.replys});
	}).catch(function (err) {
		return next(err);
	});
}
//删除评论
exports.deleteComment = function (req,res,next) {
	var cid = req.body.id;
	Comment.findByIdAndRemoveAsync(cid).then(function (result) {
		//评论数-1  
		Article.findByIdAndUpdateAsync(result.aid,{$inc:{comment_count:-1}});
		return res.status(200).send({status: 1,success:true,message: "删除评论成功"});
	}).catch(function (err) {
		return next(err);
	})
}
//删除回复
exports.deleteReply = function (req,res,next) {
	var cid = req.body.commentId;
  var rid = req.body.replyId;
  if(!cid){
		return res.status(422).send({status: 0, error_msg:"缺少评论ID"});
	}
	if(!rid){
		return res.status(422).send({status: 0, error_msg:"缺少回复ID"});
	}
	Comment.findByIdAndUpdateAsync(cid,{$pull:{replys:{ _id:mongoose.Types.ObjectId(rid) }}},{new:true}).then(function (result) {
		return res.status(200).send({status: 1,success:true,message: "删除回复成功",data:result});
	}).catch(function (err) {
		return next(err);
	});
}