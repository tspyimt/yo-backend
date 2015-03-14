'use strict';
/**
 * Created by tungtouch on 2/4/15.
 */
var aerospike = require('aerospike');
var appConfig = require('../../configs/AppConfig.json');
var config = appConfig.development.databases.aerospike;

var asConfig = {
    hosts: [{addr: config.clusterIP, port: config.port}]
};

var client = aerospike.client(asConfig);

client.connect(function (response) {
    console.log("Connect Status: ", response);
});

exports.client = client;
exports.as = aerospike;