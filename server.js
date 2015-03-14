var express = require('express');
var app = express();
var EJS = require('ejs');
var path = require('path');
var http = require('http');
var async = require('async');
var AppBuilder = require('./modules/AppBuilder');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var compression = require('compression');


app.get('/', function(req, res) {
    res.json('Yo!');
});


// Defined some global variables
global.__appBaseDir = __dirname;
global.__appEnv = process.env.NODE_ENV || "development";



//Initialize the config. Now the configurations will be available in _config global getter.
AppBuilder.initConfig({
    postProcess: function (config) {
        //Check if port is defined in environment then set that one.
        config.port = process.env.PORT || config.port;
        return config;
    }
});

//Initialize the Logger. this is available in the "log" global object.
var logOnStdOut = _config.logger.stdout.enabled;
AppBuilder.initLogger(function (message, level) {
    if (logOnStdOut) {
        //Print on console the fully formatted message
        console.log(message.fullyFormattedMessage);
    }
});


//
// Config middlewares expressjs
// ----------------------------
function parallelMidd(mid) {
    return function(req, res, next) {
        async.each(mid, function(mw, cb) {
            mw(req, res, cb);
        }, next);
    };
}

app.use(parallelMidd([
    compression(),
    bodyParser.json(),
    bodyParser.urlencoded({
        extended: true
    }),
    cookieParser(_config.hashKeySecret),
    session({
        secret: 'yololo',
        saveUninitialized: true,
        resave: true
    })
]));


//Export the app via getter in global
global.__defineGetter__("_app", function () {
    return app;
});


AppBuilder.initModels(function () {

});
var api = {
    users : require('./api/users'),
    repos : require('./api/repositories')
};

// Setup express.js
app.set('port', _config.app.port);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.set('views', path.join(__dirname, 'www', 'frontend'));
app.set('view engine', 'ejs');

// CrossDomain - Access-Control-Allow-Origin
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST', 'PUT', 'DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(express.static(path.join(__dirname, 'www', 'frontend')));


// Router
app.use('/api/v1/users', api.users);

var _server = http.createServer(app);
var server = _server.listen(app.get('port'), function() {
    log.info('Server was running at ' + _config.app.serverUrl);
});

server.on('error', function(err) {
    log.error(err);
});

