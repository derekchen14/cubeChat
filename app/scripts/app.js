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
      })
      .when('/about', {
        templateUrl: 'partials/about',
      })
      .when('/tech', {
        templateUrl: 'partials/tech',
      })
      .when('/name', {
        templateUrl: 'partials/name',
        controller: 'NameCtrl'
      })
      .when('/chat', {
        templateUrl: 'partials/chat',
        controller: 'ChatCtrl'
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
  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/name');
      }
    });
  });