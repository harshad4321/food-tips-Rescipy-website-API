var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const flash = require('connect-flash');
var logger = require('morgan');
const dotenv= require('dotenv');
var indexRouter = require('./server/routes/index');
var usersRouter = require('./server/routes/users');
var hbs = require('express-handlebars');
var app = express();
 var connectDB =require('./server/models/connection');// DB connection
require('dotenv').config()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
  
app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials/'}));



app.use(session({
  secret: 'Food&TipsSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('Food&TipsSecure'));
app.use(express.static(path.join(__dirname, 'public')));

const start =async()=>{
  try{   
await connectDB(process.env.MONGO_URI,{useNewUrlParser:true})

}catch(error){
  console.log(error); 
}
}

    app.use('/', indexRouter);
    app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
start()
module.exports = app;
