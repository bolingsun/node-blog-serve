'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var TagCategory = mongoose.model('TagCategory');
var Tag = mongoose.model('Tag');

//添加添签分类
exports.addTagCat = function (req,res,next) {
	var catName = req.body.name;
	if(!catName){
		return res.status(422).send({status: 0,error_msg:"标签分类名称不能为空"});
	}
	TagCategory.findOneAsync({name:catName}).then(function (cat) {
		if(cat){
			return res.status(403).send({status: 0, error_msg:"分类名称已经存在"});
		}else{
			return TagCategory.createAsync(req.body).then(function (result) {
				return res.status(200).send({status: 1, success:true,catId:result._id,message: '新增标签分类成功'});
			});
		}
	}).catch(function (err) {
		return next(err);
	})
}

//获取分类列表
exports.getTagCatList = function (req,res,next) {
	TagCategory.findAsync().then(function(result){
		return res.status(200).send({status: 1, data:result});
	}).catch(function (err) {
		return next(err);
	})
}

//更新分类
exports.updateTagCat = function (req,res) {
	var id = req.body.id;
	if(req.body._id){
	  delete req.body._id;
	}
	TagCategory.findByIdAndUpdateAsync(id,req.body,{new:true}).then(function(result){
		return res.status(200).send({status: 1, success:true,catId:result._id, message: '更新标签分类成功'});
	}).catch(function(err){
		return next(err);
	});
}
//删除分类
//(如果分类下有标签,则不可删除)
exports.deleteTagCat = function (req,res,next) {
	var id = req.body.id;
	Tag.findOneAsync({cid:id}).then(function (tag) {
		if(tag){
			//分类下有标签,分类不可删除
			return res.status(403).send({status: 0, error_msg:"此分类下有标签不可删除"});
		}else{
			return TagCategory.findByIdAndRemoveAsync(id).then(function(cat) {
				return res.status(200).send({status: 1, success:true, message: '删除分类成功'});
			});
		}
	}).catch(function (err) {
		return next(err);
	})
}

//获取标签列表
exports.getTagList = function (req,res,next) {
	var cid = req.body.classId;
  var condition = {};
  if(cid != 0){
  	condition = {cid:cid};
  }

  Tag.find(condition)
  	.sort('sort')
  	.populate('cid')
  	.exec().then(function (tagList) {
  		return res.status(200).send({status: 1, data:tagList});
  	}).then(null,function (err) {
  		return next(err);
  	});
}
//添加标签
exports.addTag = function (req,res,next) {
	//标签名称不能重复,标签分类名称必须有.
	var cid = req.body.classId;
	var tagName = req.body.name;
	var error_msg;
	if(!tagName){
		error_msg = '标签名称不能为空';
	}else if(!cid){
		error_msg = '必须选择一个标签分类';
	}
	if(error_msg){
		return res.status(422).send({status: 0, error_msg:error_msg});
	}
	Tag.findOneAsync({name:tagName}).then(function (tag) {
		if(tag){
			return res.status(403).send({status: 0, error_msg:'标签名称已经存在.'});
		}else{
			return Tag.createAsync(req.body).then(function (result) {
					return res.status(200).send({status: 1, success:true,tag_id:result._id, message:'新增标签成功'});
			});
		}
	}).catch(function (err) {
		return next(err);
	});
}

//删除标签
exports.deleteTag = function (req,res,next) {
	var id = req.body.id;
	return Tag.findByIdAndRemoveAsync(id).then(function() {
		return res.status(200).send({status: 1, success:true, message:'删除标签成功'});
	}).catch(function (err) {
		return next(err);
	});
}
//更新标签
exports.updateTag = function (req,res,next) {
	var id = req.body.id;
	if(req.body._id){
	  delete req.body._id;
	}
	Tag.findByIdAndUpdateAsync(id,req.body,{new:true}).then(function(result){
		return res.status(200).send({status: 1,success:true,tag_id:result._id, message:'更新标签成功'});
	}).catch(function(err){
		return next(err);
	});

}
//前台获取标签列表
exports.getFrontTagList = function (req,res,next) {
	Tag.findAsync({is_show:true},{},{sort:{'sort':-1}}).then(function (result) {
		return res.status(200).send({status: 1, data:result});
	}).catch(function (err) {
		return next(err);
	});
}