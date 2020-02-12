var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
	res.render('index');
})

var PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('Server running on ' + PORT);