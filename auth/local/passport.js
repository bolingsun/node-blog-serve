/**
 * passport 本地验证策略
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// 注册验证
exports.setupSignup = function (User, config) {
  passport.use('local.signup',new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      User.findOne({
        email: email.toLowerCase()
      }, function(err, user) {
        if (err) return done(err);
        if(user) {
          return done(null, false,{status: 0,error_msg: '此邮件已经被注册'})
        }
        var newUser = new User();
        newUser.email = email,
        newUser.password = newUser.encryptPassword(password);
        newUser.role = 'user';
        newUser.save(function(err, result){
          if(err) {
            return done(err)
          }
          return done(null, newUser)
        });
      });
    }
  ));
};

// 登录验证
exports.setupLogin = function (User, config) {
  passport.use('local.login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback:true //此处为true，下面函数的参数才能有req
    },
    function(req, email, password, done) {
      User.findOne({
        email: email.toLowerCase()
      }, function(err, user) {
        if (err) return done(err);
        if (!user) {
          return done(null, false, { status: 0, error_msg: '用户名错误' });
        }
        if (!user.validPassword(password)) {
          // logger.error('登录密码错误',{'username':email});
          return done(null, false, { status: 0, error_msg: '密码错误' });
        }
				// if(user.status === 2){
        //   logger.error('被阻止登录', {'username':email});
				// 	return done(null, false, { error_msg: '用户被阻止登录.' });
				// }
				// if(user.status === 0){
        //   logger.error('未验证用户登录',{'username':email});
				// 	return done(null, false, { error_msg: '用户未验证.' });
				// }
        return done(null, user);
      });
    }
  ));
};
