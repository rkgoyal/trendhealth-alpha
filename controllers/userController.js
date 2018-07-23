const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in User Model
let User = require('../models/user');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

// Render user registration form on GET
exports.user_register_get = function(req, res){
  res.render('register')
};

// Register process on POST
exports.user_register_post = function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors:errors
    });
  } else {
    let newUser = new User({
      name:name,
      email:email,
      username:username,
      password:password
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success','You are now registered and can log in');
            res.redirect('/users/login');
          }
        });
      });
    });
  }
};

// Render login page on GET
exports.user_login_get = function(req, res){
  res.render('login')
};

// Login process on POST
exports.user_login_post = function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/connect',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req, res, next);
};

// Logout
exports.user_logout_get = function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
};
