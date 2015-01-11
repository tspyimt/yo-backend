'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
    .controller('LoginCtrl', ['$scope', 'Topic', '$auth', function($scope, Topic, $auth) {

        $scope.authenticate = function(provider) {
            $auth.authenticate(provider, function(err, res){
            	console.log("Login info:", res);
            });
        };

    }]);
