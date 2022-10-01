const express = require("express");
const router = express.Router();
const csrf = require("csurf");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;


const User = require("../models/user");



const middleware = require("../middleware");
const {
  userSignUpValidationRules,
  userSignInValidationRules,
  validateSignup,
  validateSignin,
} = require("../middleware/validator");
const csrfProtection = csrf();
router.use(csrfProtection);



// GET: display the signup form with csrf token
router.get("/signup",middleware.isNotLoggedIn, (req, res) => {
  var errorMsg = req.flash("error")[0];
  res.render("./user/signup", {
    csrfToken: req.csrfToken(),
    errorMsg,
    
  });
});
// POST: handle the signup logic
router.post(
  "/signup", 
  [

    userSignUpValidationRules(),
    validateSignup,
    passport.authenticate("local.signup", {
      successRedirect: "/users/profile",
      failureRedirect: "/users/signup",
      failureFlash: true, 
    }),
  ],
  async (req, res) => {
    try {
      //if there is  session, save it to the user's  in db
      if (req.session) {
     
      }
      // redirect to the previous URL
      if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
      } else {
        res.redirect("/users/profile");
      }
    } catch (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/");
    }
  }
);

// GET: display the signin form with csrf token
router.get("/login", middleware.isNotLoggedIn, async (req, res) => {
  var errorMsg = req.flash("error")[0];
  res.render("user/login", {
    csrfToken: req.csrfToken(),
    errorMsg,
    
  });
});

// POST: handle the signin logic
router.post(
  "/login",
  [
    middleware.isNotLoggedIn,
    userSignInValidationRules(),
    validateSignin,
    passport.authenticate("local.login", {
      failureRedirect: "/users/login",
      failureFlash: true,
    }),
  ],
  async (req, res) => {
    try {
      if (req.session) {
       
      }
      if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
      } else {
        res.redirect("/users/profile");
      }
    } catch (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/");
    }
  }
);

// GET: display user's profile
router.get("/profile", middleware.isLoggedIn,async (req, res) => {
  try {
    const user = await User.findOne({ user: req.user })
    console.log('>>>>>>><',user);
    // find all  of this user
    res.render("user/profile", {
  username: req.user.username ,
  user
    });
  } catch (err){
    console.log(err); 
    return res.redirect("/");
  }
});



// // GET: display user's profile
// router.get("/life",async (req, res) => {
 
//     const user = await User.findOne({ user: req.user })
//     console.log('>>>>>>><',user);
//     // find all  of this user
//   res.send(user)
// });





// GET: logout
router.get("/logout", middleware.isLoggedIn, (req, res) => {

  req.session.destroy();

   req.session = null
   console.log('   req.session=null>>141',   req.session)

  res.redirect("/");
});


module.exports = router;
