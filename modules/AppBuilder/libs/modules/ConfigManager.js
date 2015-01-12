var extend = require("extend");
var path = require("path");
exports = module.exports = function ConfigManager(options, callback) {
    var configRaw = require(path.join(__appBaseDir, "configs/AppConfig.json"));
    options.postProcess = options.postProcess || function (config) {
        return config;
    };

    callback(options.postProcess(extend(true, {}, configRaw.common, configRaw[__appEnv])));
};
