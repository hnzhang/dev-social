const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');
const User = mongoose.model('Users');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport =>{
	passport.serializeUser((user, done)=>{
		done(null, user);
	});
	passport.deserializeUser((user, done)=>{
		done(null, user);
	});
	passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
		User.findById(jwt_payload.id)
			.then(user=>{
				if(user){
					return done(null, user);
				}
				return done(null, false);
			})
			.catch(err=>console.log(err));
		//console.log(jwt_payload);
	}));
};