'use strict';

angular.module('chatApp')
  .factory('Auth', function Auth($location, $rootScope, User, $cookieStore) {
    // Get currentUser from cookie
    $rootScope.currentUser = $cookieStore.get('user') || null;
    $cookieStore.remove('user');

    var login = function(user) {
      user.isActive = true;
      return User.save(user, function(mongoUser) {
        $rootScope.currentUser = mongoUser;
        return mongoUser;
      });
    };
    var createUser = function(user) {
      console.log('runs?', user);
      return User.save(user, function(user) {
        $rootScope.currentUser = user;
        console.log('Got all the way to created: ',user);
        return user;
      },
      function(err) {
        console.log('error!!: ',err);
        return err;
      });
    };

    return {
      checkUser: function(user) {
        return User.check( {name: user.name}, function(existingUser) {
          // var tree = Object.keys(existingUser).length;
          // var hat = '';
          // for (var i=0; i<tree; i++) {
          //   hat = hat+existingUser[i];
          // }
          // console.log(hat);
          if (existingUser.isActuallyNew) {
            createUser(user);
          } else if (existingUser.isActive) {
            console.log('exisiting user is active');
            return 'That name is currently being used. Please try again in a couple minutes.';
          } else {
            console.log('this inside part three');
            login(existingUser);
          }
        }, function(err) {
          console.log(err);
        }).$promise;
      },
      /** Change password *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise} */
      changeProfile: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.update({
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**Gets all available info on authenticated user
       * @return {Object} user */
      currentUser: function() {
        return User.get();
      },
    };
  });