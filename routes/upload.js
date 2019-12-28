var express = require('express');
var router = express.Router();
var auth = require('../auth/auth.service'); // 用户鉴权
var config = require('../config');

var path = require('path');
var multer  = require('multer')
let uploadDir  = path.join(__dirname, '../public/uploads/')
var storage = multer.diskStorage({
  //确定图片存储的位置
  destination: function (req, file, cb){
    cb(null, uploadDir )
  },
  filename: function (req, file, cb){
    cb(null, Date.now()+file.originalname)
  }
});
var upload = multer({ storage: storage});

// 上传单张图片
router.post('/',upload.single('file'),function (req, res, next) {
  var url = config.bashUrl + '/uploads/' + req.file.filename
  return res.status(200).send({
    status: 1,
    data: url
  })
});

module.exports = router;
