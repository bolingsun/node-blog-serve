'use strict';
// 开发环境配置
module.exports = {
  //开发环境mongodb配置
  mongo: {
    uri: 'mongodb://localhost:27017/blog-dev'
  },
  session:{
    cookie:  {maxAge: 60000*5}
  }
};