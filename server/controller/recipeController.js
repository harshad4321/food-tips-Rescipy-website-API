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
 * Dummy Data Example 
*/

// async function insertDymmyRecipeData(){
//   try {
     
//         await  Recipe.insertMany([
//               { 
//                     "name": "Puttu Recipe | How To Make Kerala Puttu Recipe | Soft Rice Puttu Recipe:",
//                     "description":` Puttu served with kadala kari is one of the most popular breakfast 
//                     combination from Kerala. Puttu is basically a steamed rice flour and coconut log.
//                      The combination of soft puttu with kadala kari (black chickpeas curry) is awesome 
//                      and you should taste it to know what I mean. Traditionally puttu was made in bamboo
//                       logs and this gave the puttu a lovely aroma.Puttu is a heavy breakfast and keeps you 
//                       full for some time. I make puttu occasionally. So the day I make puttu I also make kadala curry.`,
//                     "email": "recipeemail@raddy.co.uk",
//                     "ingredients": [
//                       "1. Take 1 cup puttu flour in a mixing bowl or a pan",
//                       "2. Add ⅓ teaspoon salt or as required.",
//                       "3. Mix very well.",
//                       "4. now sprinkle ⅓ cup water all over. The amount of water required will depend on the quality of rice flour. So you can add accordingly.",
//                       "5. Begin to mix the rice flour with the water with your fingertips.",
//                       "6. Mix very well.",
//                       "7. To get soft puttu, the amount of rice flour to water ratio is important. To check this gently press a small portion of the flour between your palms. It should form a lump. When you press this flour lump more, then it breaks and crumbles. This should be the texture of the flour.",
//                       "8. Meanwhile first place the perforated disc inside the cylindrical vessel. Then add 2 to 3 tablespoons fresh coconut in the cylindrical vessel of the puttu kudam and spread evenly.",
//                       "9. Then using a wooden skewer or the stick that accompanied the puttu kudam, remove the steamed puttu."
//                     ],
//                     "category":"Breakfast",
//                     "image":"/images/kerala-puttu-recipe.jpg ",
//                       },
//                         { 
//                             "name": "Recipe Name Goes Here",
//                             "description": `Recipe Description Goes Here`,
//                             "email": "recipeemail@raddy.co.uk",
//                             "ingredients": [
//                               "1 level teaspoon baking powder",
//                               "1 level teaspoon cayenne pepper",
//                               "1 level teaspoon hot smoked paprika",
//                             ],
//                             "category": "Snacks", 
//                             "image": "/images/unni appm.jpg"
//                           },
//                           { 
//                             "name": "Recipe Name Goes Here",
//                             "description": `Recipe Description Goes Here`,
//                             "email": "recipeemail@raddy.co.uk",
//                             "ingredients": [
//                               "1 level teaspoon baking powder",
//                               "1 level teaspoon cayenne pepper",
//                               "1 level teaspoon hot smoked paprika",
//                             ],
//                             "category": "variety dish", 
//                             "image": "/images/fish.jpg"
//                           },
//                           { 
//                             "name": "Recipe Name Goes Here",
//                             "description": `Recipe Description Goes Here`,
//                             "email": "recipeemail@raddy.co.uk",
//                             "ingredients": [
//                               "1 level teaspoon baking powder",
//                               "1 level teaspoon cayenne pepper",
//                               "1 level teaspoon hot smoked paprika",
//                             ],
//                             "category": "Lunch", 
//                             "image": "/images/images (3).jpg"
//                           },
//                         ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }
// insertDymmyRecipeData();