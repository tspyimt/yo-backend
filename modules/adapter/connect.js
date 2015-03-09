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

exports.asDB = {
        defaultNameSpace: 'yoDev',
        defaultSet: 'yoTest'
};

var client = as.client(asConfig);


client.connect(function (response) {
    console.log("Connect Status: ", response);
});
