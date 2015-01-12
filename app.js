var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.json('Yo!');
});


app.listen('8888', function() {
    console.log('Listen on port 8888');
});
