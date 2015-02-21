'use strict';
/**
 * Created by tungtouch on 2/4/15.
 */
var as = require('aerospike');
var appConfig = require('../../configs/AppConfig.json');

var config = appConfig.development.databases.aerospike;

var asConfig = {
    hosts: [{addr: config.clusterIP, port: config.port}]
};

var asDB = {
        defaultNameSpace: 'yoDev',
        defaultSet: 'yoTest'
};

var client = as.client(asConfig);

exports.connect = function (cb) {
    client.connect(function (response) {
        return cb(response);
    })
};

