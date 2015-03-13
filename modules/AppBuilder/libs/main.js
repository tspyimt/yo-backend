var ConfigManager = require("./modules/ConfigManager");
var Logger = require("./modules/Logger");
var fs = require("fs");
var path = require("path");
var MongoDatabaseProvider = require("./modules/MongoDBProvider");
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


//Init all database Models
exports.initModels = function (callback) {
    MongoDatabaseProvider.getDatabase(function (db) {
        Object.defineProperty(global, '_db', {
            get: function () {
                return db;
            }
        });
        
        fs.readdir(path.join(__appBaseDir, "models"), function (err, list) {
            if (err) log.error(err);
            else {
                
                list.forEach(function (item) {
                    var name = item.toString().replace(/\.js$/, "");
                    var model = db.getModel(name);
                    model.ensureAllManuallyDefinedSchemaIndexes();
                    Object.defineProperty(global, name, {
                        get: function () {
                            return model;
                        }
                    });
                });
            }
            callback();
        });
    });
};
