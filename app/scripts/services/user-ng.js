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
      },
      active: {
        method: 'GET',
        url: '/api/users'
      }
	  });
  });

// 'save':   {method:'POST'}
// 'query':  {method:'GET', isArray:true}
// 'remove': {method:'DELETE'}
// 'delete': {method:'DELETE'}