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

// List Users
router.get('/', function (req, res) {

    User().findAll(function (err, data) {
        if (err) {
            console.log(err);
        }
        res.send('DATA:', data);
    });

});

router.post('/', function (req, res) {
    log.debug("Request Data:", req.body);

    new User({
            "email": req.body.email,
            "username" : req.body.username,
            "password" : req.body.password
        })
        .save(function (err, data) {
            if (err) {
                console.log("err:", err);
            }
            console.log("save:", data);
        });

});

router.get('/getToken', function (req, res) {
    //res.send({'token': 1234567});
});

// define the about route
router.get('/about', function (req, res) {
    res.send('About birds');
});

module.exports = router;