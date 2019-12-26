'use strict';
// local本地验证策略子路由
var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var router = express.Router();
var User = mongoose.model('User');

// 注册路由
router.post('/signup',function(req, res, next){
    var error_msg;
    // if(!req.body.captcha){
    //   error_msg = "验证码不能为空.";
    // }else if(req.session.captcha.toUpperCase() !== req.body.captcha.toUpperCase()){
    //   error_msg = "验证码错误.";
    // }else if(req.body.email === '' || req.body.password === ''){
    //   error_msg = "用户名和密码不能为空.";
    // }
    // if(error_msg){
    //   return res.status(200).send({error_msg:error_msg});
    // }else{
    //   next();
    // }
    if(!req.body.email || !req.body.password) {
      error_msg = '输入参数错误'
    }
    if(req.body.email === '' || req.body.password === ''){
      error_msg = "用户名和密码不能为空.";
    }
    if(error_msg){
      return res.status(200).send({status: 0, error_msg:error_msg});
    }else{
      next();
    }
},function(req,res, next){
    passport.authenticate('local.signup', function (err, user, info) {
        if (err){
    			return res.status(401).send(err);
    		}
        if(info){
          return res.status(403).send(info);
        }
        return res.status(200).send({status: 1, message: '注册成功'});
      })(req, res, next)
});

// 登录路由
router.post('/login',function(req, res, next){
  var error_msg;
  // if(!req.body.captcha){
  //   error_msg = "验证码不能为空.";
  // }else if(req.session.captcha.toUpperCase() !== req.body.captcha.toUpperCase()){
  //   error_msg = "验证码错误.";
  // }else if(req.body.email === '' || req.body.password === ''){
  //   error_msg = "用户名和密码不能为空.";
  // }
  if(req.body.email === '' || req.body.password === ''){
    error_msg = "用户名和密码不能为空.";
  }
  if(error_msg){
    return res.status(200).send({status: 0,error_msg:error_msg});
  }else{
    next();
  }
},function(req,res, next){
  passport.authenticate('local.login', function (err, user, info) {
    if (err){
      return res.status(401).send(err);
    }
    if(info){
      return res.status(403).send(info);
    }
    var token = auth.signToken(user._id);
    return res.status(200).send({status: 1, token: token, message: '登录成功'});
  })(req, res, next)
});

module.exports = router;
