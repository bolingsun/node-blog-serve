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
import auth from '../auth'
import upload from './upload'
import article from './article'

module.exports = (app) => {
  app.use('/user', users);
  app.use('/auth', auth);
  app.use('/upload', upload);
  app.use('/article', article);
}