var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
import User from '../controller/user/user.controller'
// 用户注册
router.post('/register', User.userRegister);

router.get('/getCaptcha', User.getCaptcha);

module.exports = router;
