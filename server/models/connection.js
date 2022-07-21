
const mongoose = require('mongoose')


const  connectDB =  async(url)=>{
return await mongoose.connect(url)
 .then(()=>console.log('connected to db...'))   
.catch((error)=>console.log(error))

}


module.exports=connectDB


