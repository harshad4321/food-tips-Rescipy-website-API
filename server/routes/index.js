var express = require('express');
var router = express.Router();
const recipeController = require('../controller/recipeController');

require('../models/connection');

/**
 * App Routes 
*/

router.get('/', recipeController.homepage )
router.get('/recipe/:id', recipeController.exploreRecipe );
router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:id', recipeController.exploreCategoriesById);
router.post('/search', recipeController.searchRecipe );
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);

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



