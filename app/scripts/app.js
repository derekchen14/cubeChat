'use strict';

angular.module('chatApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home',
        controller: 'HomeCtrl'
        // resolve: {
        //   "accommodation": function( $q, $timeout ) {
        //     var myFriend = $q.defer();
        //     $timeout(function(){
        //       myFriend.resolve({
        //         hotelName: function() {
        //           return "My Friend's friend's hotel";
        //         },
        //         roomNo: function() {
        //           return "294";
        //         }
        //       });
        //     },5000);
        //     return myFriend.promise;
        //   }
        // }
      })
      .when('/about', {
        templateUrl: 'partials/about'
      })
      .when('/chat', {
        templateUrl: 'partials/chat',
        controller: 'ChatCtrl'
      })
      .when('/name', {
        templateUrl: 'partials/name',
        controller: 'NameCtrl'
      })
      .when('/tech', {
        templateUrl: 'partials/tech'
      })
      .when('/video', {
        templateUrl: 'partials/video',
        controller: 'VideoCtrl',
        // authenticate: true
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/name');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Cube) {
/*  $rootScope.$on('$routeChangeStart', function (event, next) {
    });
    $rootScope.$on('$routeChangeSuccess', function (event, next) {
    });  */
    $rootScope.$on('$viewContentLoaded', function() {
      var cube = Cube.createSlide($location.path());
      cube.start();
    });

  });