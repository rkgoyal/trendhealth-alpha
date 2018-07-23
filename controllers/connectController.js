// Bring in User Model
let User = require('../models/user');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

// Render connect page on GET
exports.connect_get = function(req, res){
  res.render('connect')
};

// Connect to API on button click
