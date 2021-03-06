'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = mongoose.model('User');

/** 
 * 验证token
 * credentialsRequired: true | false
 * true: 对无token请求，抛出异常
 * false: 对无token请求，不进行解析和抛出异常
 */
function authToken(credentialsRequired) {
  return compose()
        .use(function(req, res, next) {
          let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-token'];
          if(token) {
            req.headers.authorization = 'Bearer ' + token;
          }
          next();
        })
        .use(expressJwt({ 
          secret: config.session.secrets,
          credentialsRequired:credentialsRequired //是否抛出错误,false 来对无 Token 请求不进行解析和抛出异常
         }))
}
/**
 * 验证用户是否登录
 */
function isAuthenticated() {
  return compose()
    .use(authToken(true))
    .use(function (err,req,res,next) {
      //expressJwt 错误处理中间件
      if (err.name === 'UnauthorizedError') {
        // return res.status(401).send();
        // token 过期或错误
        return res.status(401).send({
          status: 0,
          error_msg: 'token错误或失效'
        })
      }
      next();
    })
    .use(function(req, res, next) {
      User.findById(req.user._id, function (err, user) {
        if (err) return res.status(500).send();
        if (!user) return res.status(401).send();
        req.user = user;
        next();
      });
    });
}

/**
 * 验证用户权限
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      }
      else {
        return res.status(403).send(
          {
            status: 0,
            error_msg: "暂无权限"
          }
        );
      }
    });
}

/**
 * 生成token
 */
function signToken(id) {
  return jwt.sign({ _id: id }, config.session.secrets, { expiresIn: '2h' });
}


exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
