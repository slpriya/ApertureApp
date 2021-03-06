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
        .then( user => {
          if (user) {
            return done( null, user);
          }
          // return !user ? done(null, false) : done(null, user)
         return done(null,false);
        })
        .catch( err => done(err, null)); //return err
    }));

}