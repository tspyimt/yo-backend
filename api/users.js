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
    console.time("put");
    var key = db.as.key('test', "tables");
    var bins = {
        i: 1233,
        s: "abc",
        l: [1, 2, 3],
        m: { s: "g3", i: 3, b: new Buffer( [0xa, 0xb, 0xc])},
        b: new Buffer([0xa, 0xb, 0xc]),
        b2: new Uint8Array([0xa, 0xb, 0xc])
    };
    var metadata = {
        ttl: 10000,
        gen: 0
    };
    db.client.put(key, bins, metadata, function(err, key) {

        var exitCode = 0;

        switch ( err.code ) {
            case db.as.status.AEROSPIKE_OK:
                break;

            default:
                console.error("Error: " + err.message);
                exitCode = 1;
                break;
        }


            console.log("--->", key);
            console.timeEnd("put");


       // process.exit(exitCode);
    });

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