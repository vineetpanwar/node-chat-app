const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname,'../public');
var port = process.env.PORT || 3000;
const hbs = require('hbs');


var app = express();

app.use(express.static(publicPath));

/*
app.get('/',function(req,res){
  res.send(path.join(publicPath,'/index.html'));
});
*/

app.listen(port,() => {
  console.log('server is up on port ${port}');
});
