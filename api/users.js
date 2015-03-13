/**
 * Created by tungtouch on 3/14/15.
 */
var express = require('express'),
    router = express.Router(),
    db = require('../modules/adapter/connect');


// middleware specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// define the home page route
router.get('/', function(req, res) {
    res.send('DATA:', key);
});

router.post('/', function (req, res) {

});

router.get('/getToken', function (req, res) {
    res.send({'token': 1234567});
});

// define the about route
router.get('/about', function(req, res) {
    res.send('About birds');
});

module.exports = router;