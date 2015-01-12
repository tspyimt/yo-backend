var ConfigManager = require("./modules/ConfigManager");
var Logger = require("./modules/Logger");
var fs = require("fs");
var path = require("path");
require("colors");


//Populate the configurations by reading the AppConfig as well as the Config.json files. The environment is considered.
exports.initConfig = function (options) {
    new ConfigManager(options, function (config) {
        Object.defineProperty(global, '_config', {
            get: function () {
                return config;
            }
        });
    });
};

//Initialize teh logger for the application. Consumer is teh method which will consume the produces logs.
exports.initLogger = function (consumer) {
    global.log = new Logger(consumer, _config.logger);
};
