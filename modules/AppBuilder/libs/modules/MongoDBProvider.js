
// Bring mongodb to project

function Database(callback) {
    var _this = this;
    var path = require('path');

    var mongoose = require("mongoose");
    this.connection = mongoose.createConnection(_config.databases.mongodb.url, {poolSize: _config.databases.mongodb.poolSize});
    this.connection.on('error', function () {
        log.error(arguments);
        if (_config.dataSource.mongo.ignoreConnectionError) callback(_this);
    });
    this.connection.once('open', function () {
        callback(_this);
    });
    
    var models = {};
    
    var Models = function(modelName) {
        var modelDes = require(path.join(__appBaseDir, "models", modelName));
        var schema = new mongoose.Schema(modelDes.schema);
        
        
        schema.statics.ensureAllManuallyDefinedSchemaIndexes = function () {
            for (var indexDescriptor in modelDes.indexes) {
                if (modelDes.indexes.hasOwnProperty(indexDescriptor)) {
                    schema.index(modelDes.indexes[indexDescriptor]);
                }
            }
            _this.connection.model(modelName, schema).ensureIndexes(function (err) {
                if (err) log.error(err);
            });
        };
        
        this.createModel = function() {
            return _this.connection.model(modelName, schema);
        };
    };
    
    this.getModel = function(name) {
        if (!Boolean(models[name])) models[name] = new Models(name).createModel();
        return models[name];
        ;
    };
}

exports.getDatabase = function (callback) {
    return new Database(callback);
};
