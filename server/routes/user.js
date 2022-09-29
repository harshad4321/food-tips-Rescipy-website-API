const express = require("express");
const router = express.Router();
const csrf = require("csurf");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

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
router.get("/signup", (req, res) => {
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
        res.redirect("./user/profile");
      }
    } catch (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/");
    }
  }
);

// GET: display the signin form with csrf token
router.get("/signin", middleware.isNotLoggedIn, async (req, res) => {
  var errorMsg = req.flash("error")[0];
  res.render("user/signin", {
    csrfToken: req.csrfToken(),
    errorMsg,
    pageName: "Sign In",
  });
});

// POST: handle the signin logic
router.post(
  "/signin",
  [
    middleware.isNotLoggedIn,
    userSignInValidationRules(),
    validateSignin,
    passport.authenticate("local.signin", {
      failureRedirect: "./user/signin",
      failureFlash: true,
    }),
  ],
  async (req, res) => {
    try {
      //  logic when the user logs in
      // let  = await .findOne({ user: req.user._id });
      // if there is a  session and user has no , save it to the user's  in db
      if (req.session) {
       
      }
      // if user has a  in db, load it to session
      // if () {
 
      // }
      // redirect to old URL before signing in
      if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
      } else {
        res.redirect("/user/profile");
      }
    } catch (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/");
    }
  }
);

// GET: display user's profile
router.get("/profile",  async (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];
  try {
    // find all  of this user
    res.render("user/profile", {
     
      errorMsg,
      successMsg,
      pageName: "User Profile",
    });
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
});

// GET: logout
router.get("/logout", middleware.isLoggedIn, (req, res) => {
  req.logout();
  
  res.redirect("/");
});
module.exports = router;
