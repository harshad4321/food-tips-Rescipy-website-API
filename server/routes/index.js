var express = require('express');
var router = express.Router();
var categoryHelpers = require('../../helpers/category-helpers')
const { resolveInclude } = require('ejs');
const recipeController = require('../controller/recipeController');

require('../models/connection');

/**
 * App Routes 
*/

router.get('/', recipeController.homepage )
  

module.exports = router;



// const { resolveInclude } = require('ejs');
// const Category = require('../models/Category');
// // const Recipe = require('../models/Recipe');
// var categoryHelpers = require('')
// /**
//  * GET /
//  * Homepage 
// */


// exports.homepage = async(req, res) => {
//   try {
//     const limitNumber = 4;
//     const categories = await Category.find({}).limit(limitNumber);
//  console.log(categories)
//     res.render('index', {categories} );
  
//   } catch (error) {
//     res.status(500).send({message: error.message || "Error Occured" });
//   }
// }



