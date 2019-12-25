// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

'use strict';

// import admin from './admin'
import users from './users'

module.exports = (app) => {
  app.use('/user', users);
}