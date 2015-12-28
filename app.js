var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var walks = require('./routes/walks');

var mongoose = require ('mongoose');
var passport = require ('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var User = require('./models/user.js');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/walks', walks);

var db = require('./config/config.js');
mongoose.connect(db);

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
    if(!user || !user.validatePassword) return done(null, false);
    console.log("LocalStrategy: {");
    console.log(user)
    console.log("}");
    return done(null, user);
  });
}));

app.use(passport.initialize());
app.use(session({
  secret: "secret",
  saveUninitialized: true,
  resave: true
}));
app.use(passport.session());

app.post("/auth", passport.authenticate('local'), function(req, res){
  res.send("got here");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
