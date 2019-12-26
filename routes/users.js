var express = require('express');
var router = express.Router();
var auth = require('../auth/auth.service'); // 用户鉴权

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
import User from '../controller/user/user.controller'
// 用户注册
router.post('/register', User.userRegister);
// 获取图片验证码
router.get('/getCaptcha', User.getCaptcha);
// 获取用户个人信息
router.get('/getInfo',auth.isAuthenticated(), User.getMe);

module.exports = router;
