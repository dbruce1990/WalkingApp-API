module.exports = function(app){
  var passport = require ('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var session = require('express-session');
  var User = require('../models/user.js');
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //configure passport http-basic strategy
  passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password"
  },
  function(username, password, done){
    User.findOne({username: username}, function(err, user){
      if(err) return done(err);
      if(!user || !user.validatePassword(password)) return done(null, false);

      return done(null, user);
    });
  }));

//setup express-session
app.use(session({
  secret: "secret",
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

return passport;
};
