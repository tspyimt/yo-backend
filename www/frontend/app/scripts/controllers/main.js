'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
  .controller('MainCtrl', ['$scope', 'Topic', 'Auth', 'User', '$cookies', function ($scope, Topic, Auth, User, $cookies) {
    // Init default
    $scope.topics = [];

    if (Auth.currentUser === null) {
      console.log("Token:", $cookies['access-token']);
      if ($cookies.access_token) {
        $scope.currentUser =
          Auth.currentUser = { id: 'social' };
      }
    }
    Auth.ensureHasCurrentUser(User);
    $scope.currentUser = Auth.currentUser;
    console.log("Current User:", $scope.currentUser);

    // Defined Method & Implement
    function getTopics() {
      Topic.find({
        filter: { limit : 10}
      }).$promise.then(
        function (result) {
          console.log("Done getTopics()", result);
          $scope.topics = result;
        },
        function (err) {
          console.log("Err getTopics():", err)
        }
      );
    }

    getTopics();

    $scope.getOne = function (param) {
      Topic.findOne({
        filter: param
      }).$promise.then(
        function (result) {
          console.log("Done getOneTopic():", result);
        },
        function (err) {
          console.log("Error getOneTopic():", err)
        })
    };

    $scope.getById = function (id) {
      Topic.findById({
        filter: {id: id}
      }).$promise.then(
        function (result) {
          console.log("Done getById():", result)
        },
        function (err) {
          console.log("Err getById():", err)
        }
      )
    }

    $scope.creatTopic = function () {
      Topic.create($scope.field).$promise.then(
        function(){
          $scope.field = '';
          $('.focus').focus();
          console.log("Done createTopic():", $scope.field);
          getTopics();
        },
        function(err){
          console.log("Err createTopic:", err);
        }
      );
    }

    $scope.removeTopic = function (id) {
      Topic.deleteById({
        id: id
      }).$promise.then(function () {
          console.log("Done removeTopic():", id);
          getTopics();
        })
    }

  }]);
