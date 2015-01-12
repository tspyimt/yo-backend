var express = require('express');
var app = express();
var AppBuilder = require('./modules/AppBuilder');


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
app.get('/', function(req, res) {
    res.json('Yo!');
});


app.listen('8888', function() {
    log.info('Listen on port 8888');
});
