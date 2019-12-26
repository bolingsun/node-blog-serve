'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var config = require('../../config')
const svgCaptcha = require('svg-captcha');
/**
 * 获取验证码
 */
exports.getCaptcha = function (req, res) {
	const cap = svgCaptcha.create({
		// 翻转颜色
		inverse: false,
		fontSize: 36,
		// 噪声线条数
		noise: 3,
		width: 80,
		height: 30,
	});
	req.session.captcha = cap.text; // session 存储验证码数值
	// console.log(req.session)
	return res.type('svg').status(200).send(cap.data);
};


// 用户注册
exports.userRegister = function (req, res) {
	var username = req.body.username ? req.body.username.replace(/(^\s+)|(\s+$)/g, "") : '';
	var email = req.body.email ? req.body.email.replace(/(^\s+)|(\s+$)/g, "") : '';
	var NICKNAME_REGEXP = /^[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+$/;
	var EMAIL_REGEXP = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	var error_msg;
	if (username === '') {
		error_msg = "用户名不能为空";
	} else if (email === '') {
		error_msg = "邮箱地址不能为空";
	} else if (username.length <= 2 || username.length > 15 || !NICKNAME_REGEXP.test(username)) {
		//不符合呢称规定.
		error_msg = "用户名不合法";
	} else if (email.length <= 4 || email.length > 30 || !EMAIL_REGEXP.test(email)) {
		error_msg = "邮箱地址不合法";
	}
	if (error_msg) {
		return res.status(200).send({
			status: 0,
			type: 'GET_ERROR_PARAM',
			message: error_msg
		});
	}

	var newUser = new User(req.body);
	newUser.role = 'user';

	newUser.saveAsync().then(function (user) {
		// Logs.create({
		// 	uid:req.user._id,
		// 	content:"创建新用户 "+ (user.email || user.nickname),
		// 	type:"user"
		// });
		return res.status(200).send({ status: 1, user_id: user._id });
	}).catch(function (err) {
		if (err.errors && err.errors.username) {
			err = { error_msg: err.errors.username.message }
		}
		return res.status(500).send(err);
	});
}