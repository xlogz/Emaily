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
},async (accessToken, refreshToken, profile, done) => {

	const existingUser = await User.find({googleId: profile.id});
	console.log('attempting to find user from profile: ' + profile );
	console.log('this is the google id: ' + profile.id);

	console.log('this is the result of looking up existing user: ' + existingUser)

	if(existingUser){
		return done(null,existingUser);
	}
		 const user = await new User({googleId: profile.id}).save();
		 done(null, user);
	

	// User.find({googleId: profile.id}).then((existingUser) => {
	// 	if(existingUser){
			//we already have a user
			// done(null, existingUser);
		// } else{
		// 	new User({googleId: profile.id}).save().then(user => done(null, user));
		// }
	// })
}));

