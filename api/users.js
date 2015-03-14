/**
 * Created by tungtouch on 3/14/15.
 */
var express = require('express'),
    router = express.Router();


// middleware specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// define the home page route
router.get('/', function(req, res) {
    res.send('Birds home page');
});

router.post('/', function (req, res) {
    // add user
    new UserModel({email : req.data.email});
});

router.get('/getToken', function (req, res) {
    res.send({'token': 1234567});
});

// define the about route
router.get('/about', function(req, res) {
    res.send('About birds');
});

module.exports = router;