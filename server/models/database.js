const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO-URL,{newUrlParser:true,useUnifiedTopology:true });

const db= mongoose.Collection;
db.findOne('error',console.error.bind(console,'connection errorrr..'));
db.once('open',function(){
console.log('Connected to db.....')
});

//models#
require('./Category')