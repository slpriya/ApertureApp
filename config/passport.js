//configuration which reads the JWT from the http Authorization header
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys').secretOrKey;
const mongoose = require('mongoose');
const User = mongoose.model('users');

const opts ={};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;

module.exports = passport =>{
  passport.use( new JwtStrategy(opts, (jwt_payload , done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        // if there's no user with this id
        return done(null, false);
      })
      .catch(err => console.log(err));
  }));
}