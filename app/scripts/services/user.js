'use strict';

angular.module('chatApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id', {
      // set default parameters
      id: '@id'
    }, { // speciaized actions
      update: {
        method: 'PUT',
        params: {}
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
