
const mongoose = require('mongoose')


const  connectDB =  async(url)=>{
return await mongoose.connect(url)
 .then(()=>console.log('connected to db...'))   
.catch((error)=>console.log(error))

}



require('./Category_Schema');
require('./Recipe_Schema')

module.exports=connectDB



// const mongoose = require('mongoose');
// const dotenv= require('dotenv');
// dotenv.config();
// //Connect to DB
// mongoose.connect(
//   process.env.MONGO_URI,
// {useNewUrlParser:true},
// ()=>console.log('connected to db...'));


// // Models
// require('./Category_Schema');
// require('./Recipe_Schema');