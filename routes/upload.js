var express = require("express");
var fs = require("fs");
var router = express.Router();
var auth = require("../auth/auth.service"); // 用户鉴权
var config = require("../config");
var path = require("path");
var formidable = require("formidable");

function isFormData(req) {
  let type = req.headers["content-type"] || "";
  return type.includes("multipart/form-data");
}

router.post("/", function(req, res) {
  if (!isFormData(req)) {
    return res
      .status(500)
      .send({
        status: 0,
        err_message: "错误的请求, 请用multipart/form-data格式"
      });
  }
  var form = new formidable.IncomingForm();
  let uploadDir = path.join(__dirname, "../public/uploads/");
  form.uploadDir = uploadDir; // 上传目录
  form.keepExtensions = true; // 保留后缀
  form.maxFileSize = 20 * 1024 * 1024; //文件大小20M
  form.type = true;
  var url;

  form.parse(req, function(err, fields, file) {
    if (err) {
      console.log(err)
      return res.status(500).send({status:0, err_message: '上传错误'})
    }
    var extName = ""; //后缀名
    //格式话解析file获取其中的属性值
    let fileStr = JSON.parse(JSON.stringify(file));
    //判断图片后缀名类型
    switch (fileStr.file.type) {
      case "image/pjpeg":
        extName = "jpg";
        break;
      case "image/jpeg":
        extName = "jpg";
        break;
      case "image/png":
        extName = "png";
        break;
      case "image/x-png":
        extName = "png";
        break;
    }
    if (extName.length === 0) {
      res.status(202).send({
        status: 0,
        err_message: "只支持png和jpg格式图片"
      });
      return;
    }
  });
  form.on('file', (name, file) => {
    // 重命名文件
    let types = file.name.split('.')
    let suffix = types[types.length - 1]
    let reFileName =  new Date().getTime() + '.' + suffix
    url = config.bashUrl + '/uploads/' + reFileName // 返回url地址
    fs.renameSync(file.path, uploadDir + reFileName) // 在磁盘重命名文件
  })
  // 上传进度条
  // form.on('progress', (bytesReceived, bytesExpected) => {
  //   var percent = Math.floor(bytesReceived / bytesExpected * 100)
  //   console.log(percent)
  // })

  form.on('end', () => {
    res.status(200).send({status: 1, data: url, message: '上传成功'})
  })
});

module.exports = router;

// var express = require('express');
// var router = express.Router();
// var auth = require('../auth/auth.service'); // 用户鉴权
// var config = require('../config');

// var path = require('path');
// var multer  = require('multer')
// let uploadDir  = path.join(__dirname, '../public/uploads/')
// var storage = multer.diskStorage({
//   //确定图片存储的位置
//   destination: function (req, file, cb){
//     cb(null, uploadDir )
//   },
//   filename: function (req, file, cb){
//     cb(null, Date.now()+file.originalname)
//   }
// });
// var upload = multer({ storage: storage});

// // 上传单张图片
// router.post('/',upload.single('file'),function (req, res, next) {
//   console.log(req)
//   var url = config.bashUrl + '/uploads/' + req.file.filename
//   return res.status(200).send({
//     status: 1,
//     data: url
//   })
// });

// module.exports = router;
