


const dotenv= require('dotenv');
const mongoose = require('mongoose')

dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.MONGO_URI,
{useNewUrlParser:true},
()=>console.log('connected to db...'));




//models#
require('./Category')
require('./Recipe');