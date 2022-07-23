require('../models/connection');
const Category = require('../models/Category_Schema');
const Recipe = require('../models/Recipe_Schema');


/**
 * GET /
 * Homepage  
*/


exports.homepage = async(req, res) => {
  try {
    const limitNumber = 4;
    const categories = await Category.find({}).limit(limitNumber);

    const recipes = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
    const Breakfast = await Recipe.find({ 'category': 'Breakfast' }).limit(limitNumber);
    const Snacks = await Recipe.find({ 'category': 'Snacks' }).limit(limitNumber);
    const variety_dish = await Recipe.find({ 'category': 'variety dish' }).limit(limitNumber);
    const Lunch = await Recipe.find({ 'category': 'Lunch' }).limit(limitNumber);
 
    // console.log('food>>>>>>>>',food)
    console.log('categories>>>>>>',categories)
    res.render('index', {categories,recipes,Breakfast,Snacks,variety_dish,Lunch} );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}


/**
 * GET /categories
 * Categories 
*/
exports.exploreCategories = async(req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);
    res.render('categories', { categories} );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * GET /recipe/:id
 * Recipe 
*/
exports.exploreRecipe = async(req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render('recipe', {recipe} );

  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /categories/:id
 * Categories By Id
*/
exports.exploreCategoriesById = async(req, res) => { 
  try {
    let categoryId = req.params.id;
    const limitNumber = 7;
    const categoryById = await Recipe.find({ 'categories': categoryId }).limit(limitNumber);
    res.render('categories', {categoryById} );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 