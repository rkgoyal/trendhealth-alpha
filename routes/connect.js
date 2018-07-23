var express = require('express');
var router = express.Router();

// Require our controllers.
var connect_controller = require('../controllers/connectController');


// Render connect page on GET
router.get('/', connect_controller.connect_get);


module.exports = router;
