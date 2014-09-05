'use strict';

angular.module('chatApp')
  .factory('Cube', function ($location, $timeout) {
    var s = {};
    // $location.path(nextPath);
    // if(!$scope.$$phase) { $scope.$apply(); }

    var changeSlide = function(nextSide) {
      var sides = ['front','back','left','right','top','bottom'];
      var paths = ['home','about','chat','video','tech','name'];
      var order = sides.indexOf(nextSide);
      var nextPath = "/"+paths[order];
      $timeout( function() {
        $location.path(nextPath);
      }, 0);
    };

    s.changeSlide = changeSlide;
    return s;

  });