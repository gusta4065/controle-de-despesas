const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/app/index.html');
})
  
app.listen(3000, function(error){
    if(error) throw error
    console.log("Server created Successfully http://localhost:3000");
})