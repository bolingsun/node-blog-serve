'use strict';

var path = require('path');
var _ = require('lodash');
var fs = require('fs');

var all = {
  bashUrl:"http://120.76.134.124/api/",
  env: process.env.NODE_ENV,
  // port: process.env.PORT || 9000,
  //mongodb配置
  mongo: {
    options: {
      useNewUrlParser:true,
      useUnifiedTopology: true
    }
  },
  session:{
    secrets: 'blog-secret',
    name: 'myblog',
    cookie:  {maxAge: 60000*5}
  },
  //用户角色种类
  userRoles: ['user', 'admin'],
};

var config = _.merge(all,require('./' + process.env.NODE_ENV + '.js') || {});
module.exports = config;
