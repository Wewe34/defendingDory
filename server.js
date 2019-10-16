var express = require('express');
var app = express();
const path = require('path');


app.use('/', express.static(path.join(__dirname, '/src')));
app.listen(process.env.PORT || 1341, function(){
	console.log('Listening on Port 1341..');
  });