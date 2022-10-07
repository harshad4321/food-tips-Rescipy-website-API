const Recipe = require('../server/models/Recipe_Schema');
 var objectId=require('mongodb').ObjectId

module.exports={

    getRecipeDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
         Recipe.findOne({_id:objectId(proId)}).then((recipe)=>{
            resolve(recipe)
          })
        })
      },


    deleteRecipe:(prodId)=>{
      return new Promise((resolve,reject)=>{
        Recipe.deleteOne({_id:objectId(prodId)}).then((response)=>{
          resolve(response)})
      })
    },

 updateRecipe:(proId,proDetails)=>{
  Recipe.updateOne({_id:objectId(proId)},{
    $set: {
      name: proDetails.name,
      description: proDetails.description,
      email:proDetails.email,
      userId:proDetails.id,
      ingredients:proDetails.ingredients,
      category:proDetails.category, 
     
        
    }
  }).then((recipe)=>{ 
    // resolve(recipe)
  })
  }
}

    
