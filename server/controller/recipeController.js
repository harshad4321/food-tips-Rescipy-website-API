require('../models/connection');
const Category = require('../models/Category');
// const Recipe = require('../models/Recipe');


/**
 * GET /
 * Homepage  
*/


exports.homepage = async(req, res) => {
  try {
    const limitNumber = 4;
    const categories = await Category.find({}).limit(limitNumber);
 console.log('>>>>',categories)
 console.log('.....>>',Category)
    res.render('index', {categories} );
    
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}




/**
 * Dummy Data Example 
*/

// async function insertDymmyCategoryData(){
//   try {
//     await Category.insertMany([
//       {
//         "name": "spicy curry",
//         "image": "fish.jpg"
//       },
//       {
//         "name": "Snacks",
//         "image": "unni appm.jpg"
//       }, 
//       {
//         "name": "Breakfast",
//         "image": "puttu.jpg"
//       },
//       {
//         "name": "Lunch",
//         "image": "Lunch.jpg"
//       }, 
      
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }
// insertDymmyCategoryData()