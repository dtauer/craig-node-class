// This file just configures the passport library
const passport = require('passport')
const User = require('../models/User')
const LocalStrategy = require('passport-local').Strategy


module.exports = function(){
    passport.serializeUser(function(user, done){
        done(null, user._id)
    })

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user)
        })
    })

    passport.use("login", new LocalStrategy(
      {
        usernameField: 'email',   // Need to let passport know we are using a different field for username
        passwordField: 'password'  
      },
      function(email, password, done) {
        console.log('logging in with:', email, password)
        User.findOne({ email }, function(err, user) {
          console.log(err, user)
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: "No user has that username!" });
          }
          user.checkPassword(password, function(err, isMatch) {
            if (err) { return done(err); }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Invalid password." });
            }
          });
        });
      }));

}
