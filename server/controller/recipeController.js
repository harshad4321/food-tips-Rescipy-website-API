require('../models/connection');

const Category = require('../models/Category_Schema');
const Recipe = require('../models/Recipe_Schema');
const Recipes = require('../models/recipe');
const User = require("../models/userdata");
const recipeHelpers = require('../../helpers/recipe-helper')
var objectId=require('mongodb').ObjectId
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
    res.status(500).send({message: error.message || "Error Occured" });
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

/**
 * POST /search
 * Search 
*/
exports.searchRecipe = async(req,res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render('search', {recipe} );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  } 
}

/**
 * GET /explore-latest
 * Explplore Latest 
*/
exports.exploreLatest = async(req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('explore-latest', { recipe } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 
/**
 * GET /explore-random
 * Explore Random as JSON
*/
exports.exploreRandom = async(req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
    res.render('explore-random', {  recipe } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /submit-recipe
 * Submit Recipe
*/
exports.submitRecipe = async(req, res) => {
 
  const user = await User.findById(req.user.id)
   
  const infoErrorsObj = req.flash('infoErrors')[0];
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', 
  { title: 'Submit Recipe', infoErrorsObj, infoSubmitObj , user,} );
}

/**
 * POST /submit-recipe
 * Submit Recipe
*/
exports.submitRecipeOnPost = async(req, res) => {
  try { 
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;
      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      })

    }
    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      userId:req.user.id,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName,
      
    });
    
    await newRecipe.save();

    req.flash('infoSubmit', 'Recipe has been added.')
    res.redirect('/submit-recipe');
  } catch (error) {
    // res.json(error);
    req.flash('infoErrors', 'Please,Add all the details of this Recipe');
    res.redirect('/submit-recipe'); 
  }
}




/**
 * GET /view-recipe
*/
exports.viewRecipe  = async(req, res) => {
  const user = await User.findById(req.user.id)   

  let userID = req.user.id
let  recipe = await Recipe.aggregate([
  { "$match": { "userId":userID } } 
])

if(recipe){
try {
  res.render('view-recipe', 
  {
   recipe,
 user,
  })
 } catch (error) {
   console.log(error);
 }
 
}else{

  console.log('some thing is wrong...')
  redirect('/')
}
}






// Delete Recipe

exports. deleteRecipe= async(req,res)=>{
    
  let proId =req.params.id 
console.log(proId);
recipeHelpers.deleteRecipe(proId).then((response )=>{
res.redirect('/view-recipe')
})
}




/**
 * GET /Update Recipe
*/
exports. updateRecipe= async(req,res)=>{

  const infoErrorsObj = req.flash('infoErrors')[0];
  const infoSubmitObj = req.flash('infoSubmit');
  
  const user = await User.findById(req.user.id)   

let recipe =await  recipeHelpers.getRecipeDetails(req.params.id)
try {
  res.render('user/update', 
  {
 user,
 recipe,
 infoSubmitObj ,
 infoErrorsObj, 
  })
 } catch (error) {
   console.log(error);
 }
 
}


exports. updateRecipeSubmit= async(req,res)=>{
  
  recipeHelpers.updateRecipe(req.params.id,req.body)

  res.render('user/update')

  let imageUploadFile;
  let uploadPath;
  let newImageName;

   if (req.files && req.files.Image){
    
      imageUploadFile = req.files.Image;
      newImageName = Date.now() + imageUploadFile.name;
      uploadPath = require('path').resolve('./') +'/public/uploads/' + newImageName;
      imageUploadFile.mv(uploadPath, function(err){  
        if(err) return res.satus(500).send(err);
     
      imageid =newImageName

      let proId =req.params.id 
    
       Recipe.findByIdAndUpdate({_id:objectId(proId)}, {$set:{'image':imageid}}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
       
      })
      
    })
     
    }
    else{
      console.log(' image is not')
    }
  }
   
  


