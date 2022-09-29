const passport = require("passport");
// load all the things we need
const LocalStrategy = require("passport-local").Strategy;
const User = require("../server/models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  "local.signup",
  new LocalStrategy({
// by default, local strategy uses username and password, we will override with email
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (user) {
          return done(null, false, { message: "Email already exists" });
        }
       
 // if there is no user with that email
 // create the user
        const newUser =  new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        console.log( newUser.password )
   
        newUser.username = req.body.name;
 // save the user
        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: false,
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "User doesn't exist" });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Wrong password" });
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);
