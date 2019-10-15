var express = require('express');
var app = express();
const path = require('path');


app.use('/public', express.static(path.join(__dirname, 'public')));
app.listen(process.env.PORT || 1341, function(){
	console.log('Listening on Port 8888..');
  });
