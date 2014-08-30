'use strict';

angular.module('chatApp')
  .controller('VideoCtrl', function ($scope, VideoBox) {
    // $scope.getMessages = VideoBox.getMessages;
    // $scope.getVisitors = VideoBox.getVisitors;

    $scope.sendMessage = function () {
      if(!$scope.newMessage) {
        return;
      }
      VideoBox.sendMessage($scope.newMessage);
      $scope.newMessage = '';
    };
  });