'use strict';
/**
 * @ngdoc overview
 * @name yoApp
 * @description
 * # yoApp
 *
 * Main module of the application.
 */
var yo, config, bootstrap, routeDef, templates_field, fields;

bootstrap = window.bootstrap;

yo = angular.module('yoApp', bootstrap.dependencies);

// Constant Application
yo.constant("config", bootstrap.GET_ENV());

// Config Application
yo.config(['$stateProvider', '$authProvider', '$httpProvider', '$urlRouterProvider', '$resourceProvider', '$locationProvider', 'LoopBackResourceProvider', 'formlyConfigProvider', 'config',
    function($stateProvider, $authProvider, $httpProvider, $urlRouterProvider, $resourceProvider, $locationProvider, LoopBackResourceProvider, formlyConfigProvider, config) {

        // Set up the states fromt Bootstrap.js
        Object.keys(bootstrap.routes)
            .forEach(function(route) {
                routeDef = bootstrap.routes[route];
                $stateProvider.state(route, routeDef);
            });

        // Remove Hashtag to SEO
        $locationProvider.html5Mode(bootstrap.html5Mode);

        // For any unmatched url, eg: redirect to /main
        $urlRouterProvider.otherwise(bootstrap.otherwise);

        // Don't strip trailing slashes from calculated URLs
        $resourceProvider.defaults.stripTrailingSlashes = bootstrap.stripTrailingSlashes;

        // CORS XSS
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        // Use a custom auth header instead of the default 'Authorization'
        LoopBackResourceProvider.setAuthHeader(bootstrap.setAuthHeader);

        // Auto Access REST API server
        LoopBackResourceProvider.setUrlBase(config.url);

        // Facebook Auth
        $authProvider.facebook(bootstrap.authProvider.facebook);

        // Google Auth
        $authProvider.google(bootstrap.authProvider.google);

        // Config Auth 
        Object.keys(bootstrap.authProvider.config)
            .forEach(function(conf) {
                var confDef = bootstrap.authProvider.config[conf];
                $authProvider[conf] = confDef;
            })

        // Config Template for Field
        var templates_field = 'views/elements/';
        var fields = ['checkbox', 'email', 'hidden', 'number', 'password', 'radio', 'select', 'text', 'textarea', 'date', 'time'];

        angular.forEach(fields, function(val) {
            formlyConfigProvider.setTemplateUrl(val, templates_field + val + '.html');
        });


    }
]).run(function() {
    console.log("Running App !");
});
