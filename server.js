const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User.js');
require('./services/passport.js');


const app = express();

app.use(bodyParser.json());

app.use(cookieSession({
	//30 days, 24 hours, 60 minutes an hour, 60 seconds a minute, 1000 miliseconds a second
	maxAge: 30 * 24 * 60 * 60 * 1000,
	keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

console.log('using key for google client: ' + keys.googleClientID);
console.log('using key for google client: ' + keys.googleClientSecret)

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if(process.env.NODE_ENV === 'production'){
	// Express will serve up production assets
	// like our main js file, or main css file!
	app.use(express.static('client/build'));

	//Express will serve uip the index.html file 
	//if it doesnt recognize the route
}else{
	app.use(express.static(__dirname + '/public'));
}

const path = require('path');

app.get('*', (req, res) =>{
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})


//OAUTH clientId - 382620893560-9msjktib17hg22r95868chpgvg98n7es.apps.googleusercontent.com
//OAUTH clientsecret - dA1HnE7T49OV02pIgmZwJgfw




app.get('/', function(req,res){
	res.render('index');
})

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log('Server running on ' + PORT);