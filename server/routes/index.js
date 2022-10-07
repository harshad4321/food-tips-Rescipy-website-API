var express = require('express');
var router = express.Router();
const recipeController = require('../controller/recipeController');

require('../models/connection');
const middleware = require("../middleware");
/**
 * App Routes 
*/

router.get('/', recipeController.homepage);
router.get('/recipe/:id', recipeController.exploreRecipe);
router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:id', recipeController.exploreCategoriesById);
router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', middleware.isLoggedIn, recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);
router.get('/view-recipe', middleware.isLoggedIn, recipeController.viewRecipe);
router.get('/update/:id', middleware.isLoggedIn, recipeController.updateRecipe);
router.post('/update/:id', middleware.isLoggedIn, recipeController.updateRecipeSubmit);
router.get('/delete/:id', recipeController.deleteRecipe);
module.exports = router;


