'use strict';
/**
 * 上传文件控制层
 */
var _ = require('lodash');
var mongoose = require('mongoose');
var path = require('path');
var config = require('../config');
var path = require("path");
var formidable = require("formidable");


function isFormData(req) {
  let type = req.headers["content-type"] || "";
  return type.includes("multipart/form-data");
}
// 上传图片
exports.uploadPic = function (req,res,next) {
  if (!isFormData(req)) {
    return res
      .status(500)
      .send({
        status: 0,
        err_message: "错误的请求, 请用multipart/form-data格式"
      });
  }
  var form = new formidable.IncomingForm();
  let uploadDir = path.join(__dirname, "../tmp");
  form.uploadDir = uploadDir; // 上传目录
  form.keepExtensions = true; // 保留后缀
  form.maxFileSize = 20 * 1024 * 1024; //文件大小20M
  form.type = true;

  // 上传进度条
  // form.on('progress', (bytesReceived, bytesExpected) => {
  //   var percent = Math.floor(bytesReceived / bytesExpected * 100)
  //   console.log(percent)
  // })

  form.parse(req, function(err, fields, file) {
    if (err) {
      return res.status(500).send({status:0, err_message: '上传错误'})
    }
    var filePath = ''
    //如果提交文件的form中将上传文件的input名设置为tmpFile，就从tmpFile中取上传文件。否则取for in循环第一个上传的文件。
    if(file.temFile) {
      filePath = file.tmpFile.path;  
    } else {
      for(var key in file){  
        if( file[key].path && filePath==='' ){  
            filePath = file[key].path;  
            break;  
        }  
    }  
    }
     //文件移动的目录文件夹，不存在时创建目标文件夹  
     var targetDir = path.join(__dirname, '../public/uploads/');  
     if (!fs.existsSync(targetDir)) {  
         fs.mkdir(targetDir);  
     }  
    var fileExt = filePath.substring(filePath.lastIndexOf('.'));  
       //判断文件类型是否允许上传  
       if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {  
        var err = new Error('此文件类型不允许上传');  
        res.send({status:0, message:'此文件类型不允许上传'});  
    } else {  
        //以当前时间戳对上传文件进行重命名  
        var fileName = new Date().getTime() + fileExt;  
        var targetFile = path.join(targetDir, fileName);  
        //移动文件  
        fs.rename(filePath, targetFile, function (err) {  
            if (err) {  
                res.send({status:0, message:'操作失败'});  
            } else {  
                //上传成功，返回文件的相对路径  
                var fileUrl = config.bashUrl + '/uploads/' + fileName;  
                res.send({status:1, data:fileUrl});  
            }  
        });  
    }  
  });
}
// 上传图片
exports.deletePic = function(req,res,next) {
  if(!req.body.name || req.body.name == ''){
    return res.status(422).send({error_msg:"删除文件名称不能为空"});
  }
  var pathDir = path.join(__dirname, '../public/uploads/');
  try {
    fs.unlinkSync(pathDir + req.body.name)
    res.status(200).send({
      status: 1,
      message: "删除文件成功"
    })
  } catch(err) {
    res.status(500).send({
      status: 0,
      err_message: "删除文件失败"
    })
  }
}
