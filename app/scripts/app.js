'use strict';

angular.module('chatApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'btford.socket-io'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      // .when('/chat', {
      //   templateUrl: 'partials/chat',
      //   controller: 'ChatCtrl'
      //   authenticate: true
      // })
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
  });
/*
  .run(function ($rootScope, $location, Cube) {
  $rootScope.$on('$routeChangeStart', function (event, next) {
    });
    $rootScope.$on('$routeChangeSuccess', function (event, next) {
    });
    $rootScope.$on('$viewContentLoaded', function() {
    });
  });
*/