const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User.js');
require('./services/passport.js');


const app = express();

app.use(cookieSession({
	//30 days, 24 hours, 60 minutes an hour, 60 seconds a minute, 1000 miliseconds a second
	maxAge: 30 * 24 * 60 * 60 * 1000,
	keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

require('./routes/authRoutes')(app);


//OAUTH clientId - 382620893560-9msjktib17hg22r95868chpgvg98n7es.apps.googleusercontent.com
//OAUTH clientsecret - dA1HnE7T49OV02pIgmZwJgfw


app.use(express.static(__dirname + '/public'));



app.get('/', function(req,res){
	res.render('index');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('Server running on ' + PORT);