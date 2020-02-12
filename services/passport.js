const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	console.log('attempting to serializeUser ', user)
	done(null, user);
})

passport.deserializeUser((id, done) => {
	console.log('this is the id ', id)
	User.findById(id)
		.then(user => {
			done(null, user);
		})
})

passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {

	User.find({googleId: profile.id}).then((existingUser) => {
		if(existingUser){
			//we already have a user
			done(null, existingUser);
		} else{
			new User({googleId: profile.id}).save().then(user => done(null, user));
		}
	})
}));

