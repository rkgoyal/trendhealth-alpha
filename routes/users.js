var express = require('express');
var router = express.Router();

// Require our controllers.
var user_controller = require('../controllers/userController');


// Register Form
router.get('/register', user_controller.user_register_get);

// Register Process
router.post('/register', user_controller.user_register_post);

// Login Form
router.get('/login', user_controller.user_login_get);

// Login Process
router.post('/login', user_controller.user_login_post);

// Logout
router.get('/logout', user_controller.user_logout_get);


module.exports = router;
