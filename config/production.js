'use strict';
// 生产环境配置
var MONGO_ADDR = "blogAdmin:19881127bo"

module.exports = {
  // port: process.env.PORT || 8800,
  //生产环境mongodb配置
  mongo: {
    uri: 'mongodb://' +  MONGO_ADDR + '@127.0.0.1/myblog?authSource=myblog'
  },
  //生产环境cookie是否需要domain视具体情况而定.
  session:{
    cookie:  {domain:'120.76.134.124',maxAge: 60000*5}
  }
};