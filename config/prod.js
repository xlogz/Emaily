module.exports = {

	// prodGoogleClientID: '968945433682-t1gptc3evmi4sv51rjq98couif8vr3kq.apps.googleusercontent.com',
	// prodGoogleClientSecret: 'y8QXaUT0g06rM-3Xz59XcJlO'

	googleClientID: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	mongoURI: process.env.MONGO_URI,
	cookieKey: process.env.COOKIE_KEY,
	stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	stripeSecretKey: process.env.STRIPE_SECRET_KEY,
	sendGridKey: process.env.SEND_GRID_KEY,
	redirectDomain: process.env.REDIRECT_DOMAIN
}