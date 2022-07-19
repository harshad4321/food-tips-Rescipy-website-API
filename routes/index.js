var express = require('express');
var router = express.Router();
const recipeController = require('../server/controller/recipeController');
/**
 * App Routes 
*/
router.get('/', recipeController.homepage, function(req, res, next) {
  res.render('index', {admin:true});
});

module.exports = router;
