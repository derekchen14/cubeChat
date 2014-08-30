'use strict';
var slidr;

angular.module('chatApp')
  .factory('Cube', function ($location, $timeout) {
    var s = {};

    var create = function(dir) {
      if (dir === '/') {
        var slideHome = slidr.create('home', settings);
        slideHome.add('h', ['front', 'right', 'left', 'front'], 'cube', true);
        slideHome.add('v', ['front', 'bottom', 'top', 'front'], 'cube', true);
        return slideHome;
      } else if (dir === '/about') {
        var slideAbout = slidr.create('about', settings);
        slideAbout.add('h', ['back', 'left', 'right', 'back'], 'cube', true);
        slideAbout.add('v', ['back', 'top', 'bottom', 'back'], 'cube', true);
        return slideAbout;
      } else if (dir === '/chat') {
        var slideChat = slidr.create('chat', settings);
        slideChat.add('h', ['left', 'front', 'back', 'left'], 'cube', true);
        slideChat.add('v', ['left', 'top', 'bottom', 'left'], 'cube', true);
        return slideChat;
      } else if (dir === '/name') {
        var slideName = slidr.create('name', settings);
        slideName.add('h', ['bottom', 'right', 'left', 'bottom'], 'cube', true);
        slideName.add('v', ['bottom', 'back', 'front', 'bottom'], 'cube', true);
        return slideName;
      } else if (dir === '/video') {
        var slideVideo = slidr.create('video', settings);
        slideVideo.add('h', ['right', 'back', 'front', 'right'], 'cube', true);
        slideVideo.add('v', ['right', 'bottom', 'top', 'right'], 'cube', true);
        return slideVideo;
      } else if (dir === '/tech') {
        var slideTech = slidr.create('tech', settings);
        slideTech.add('h', ['top', 'left', 'right', 'top'], 'cube', true);
        slideTech.add('v', ['top', 'front', 'back', 'top'], 'cube', true);
        return slideTech;
      }
    };
    // var read = function() {
    //   return slide;
    // };
    // var update = function(dir, sides) {
    //   slide.add(dir, sides, 'cube', true);
    // };

    // var changeControls = function(e) {
    //   var direction = 'Horizontal';
    //   if ((e.in.dir === 'up') || (e.in.dir === 'down')) {
    //     direction = 'Vertical';
    //   }
      // if (e.in.slidr === 'front') {
      //   switch(e.out.slidr+direction) {
      //     case 'topVertical':
      //       s.add('h', ['front','right','back','left','front'], 'cube', true);
      //       break;
      //     case 'topHorizontal':
      //       s.add('v', ['front','left','back','right','front'], 'cube', true);
      //       break;
      //     case 'leftVertical':
      //       s.add('h', ['front','top','back','bottom','front'], 'cube', true);
      //       break;
      //     case 'leftHorizontal':
      //       s.add('v', ['front','bottom','back','top','front'], 'cube', true);
      //       break;
      //     case 'bottomVertical':
      //       s.add('h', ['front','right','back','left','front'], 'cube', true);
      //       break;
      //     case 'bottomHorizontal':
      //       s.add('v', ['front','left','back','right','front'], 'cube', true);
      //       break;
      //     case 'rightVertical':
      //       s.add('h', ['front','top','back','bottom','front'], 'cube', true);
      //       break;
      //     case 'rightHorizontal':
      //       s.add('v', ['front','bottom','back','top','front'], 'cube', true);
      //       break;
      //   }
      // }
    //   if (e.in.slidr === 'back') {
    //     switch(e.out.slidr+direction) {
    //       case 'topVertical':
    //         s.add('h', ['back','left','front','right','back'], 'cube', true);
    //         break;
    //       case 'topHorizontal':
    //         s.add('v', ['back','right','front','left','back'], 'cube', true);
    //         break;
    //       case 'leftVertical':
    //         s.add('h', ['back','bottom','front','top','back'], 'cube', true);
    //         break;
    //       case 'leftHorizontal':
    //         s.add('v', ['back','top','front','bottom','back'], 'cube', true);
    //         break;
    //       case 'bottomVertical':
    //         s.add('h', ['back','left','front','right','back'], 'cube', true);
    //         break;
    //       case 'bottomHorizontal':
    //         s.add('v', ['back','right','front','left','back'], 'cube', true);
    //         break;
    //       case 'rightVertical':
    //         s.add('h', ['back','bottom','front','top','back'], 'cube', true);
    //         break;
    //       case 'rightHorizontal':
    //         s.add('v', ['back','top','front','bottom','back'], 'cube', true);
    //         break;
    //     }
    //   }
    //   if (e.in.slidr === 'left') {
    //     switch(e.out.slidr+direction) {
    //       case 'topVertical':
    //         s.add('h', ['left','front','right','back','left'], 'cube', true);
    //         break;
    //       case 'topHorizontal':
    //         s.add('v', ['left','back','right','front','left'], 'cube', true);
    //         break;
    //       case 'bottomVertical':
    //         s.add('h', ['left','front','right','back','left'], 'cube', true);
    //         break;
    //       case 'bottomHorizontal':
    //         s.add('v', ['left','back','right','front','left'], 'cube', true);
    //         break;
    //       case 'frontVertical':
    //         s.add('h', ['left','top','right','bottom','left'], 'cube', true);
    //         break;
    //       case 'frontHorizontal':
    //         s.add('v', ['left','bottom','right','top','left'], 'cube', true);
    //         break;
    //       case 'backVertical':
    //         s.add('h', ['left','top','right','bottom','left'], 'cube', true);
    //         break;
    //       case 'backHorizontal':
    //         s.add('v', ['left','bottom','right','top','left'], 'cube', true);
    //         break;
    //     }
    //   }
    //   if (e.in.slidr === 'right') {
    //     switch(e.out.slidr+direction) {
    //       case 'topVertical':
    //         s.add('h', ['right','front','left','back','right'], 'cube', true);
    //         break;
    //       case 'topHorizontal':
    //         s.add('v', ['right','back','left','front','right'], 'cube', true);
    //         break;
    //       case 'bottomVertical':
    //         s.add('h', ['right','front','left','back','right'], 'cube', true);
    //         break;
    //       case 'bottomHorizontal':
    //         s.add('v', ['right','back','left','front','right'], 'cube', true);
    //         break;
    //       case 'frontVertical':
    //         s.add('h', ['right','top','left','bottom','right'], 'cube', true);
    //         break;
    //       case 'frontHorizontal':
    //         s.add('v', ['right','bottom','left','top','right'], 'cube', true);
    //         break;
    //       case 'backVertical':
    //         s.add('h', ['right','top','left','bottom','right'], 'cube', true);
    //         break;
    //       case 'backHorizontal':
    //         s.add('v', ['right','bottom','left','top','right'], 'cube', true);
    //         break;
    //     }
    //   }
    //   if (e.in.slidr === 'top') {
    //     switch(e.out.slidr+direction) {
    //       case 'frontVertical':
    //         s.add('h', ['top','right','bottom','left','top'], 'cube', true);
    //         break;
    //       case 'frontHorizontal':
    //         s.add('v', ['top','left','bottom','right','top'], 'cube', true);
    //         break;
    //       case 'backVertical':
    //         s.add('h', ['top','right','bottom','left','top'], 'cube', true);
    //         break;
    //       case 'backHorizontal':
    //         s.add('v', ['top','left','bottom','right','top'], 'cube', true);
    //         break;
    //       case 'leftVertical':
    //         s.add('h', ['top','front','bottom','back','top'], 'cube', true);
    //         break;
    //       case 'leftHorizontal':
    //         s.add('v', ['top','back','bottom','front','top'], 'cube', true);
    //         break;
    //       case 'rightVertical':
    //         s.add('h', ['top','front','bottom','back','top'], 'cube', true);
    //         break;
    //       case 'rightHorizontal':
    //         s.add('v', ['top','back','bottom','front','top'], 'cube', true);
    //         break;
    //     }
    //   }
    //   if (e.in.slidr === 'bottom') {
    //     switch(e.out.slidr+direction) {
    //       case 'frontVertical':
    //         s.add('h', ['bottom','right','top','left','bottom'], 'cube', true);
    //         break;
    //       case 'frontHorizontal':
    //         s.add('v', ['bottom','left','top','right','bottom'], 'cube', true);
    //         break;
    //       case 'backVertical':
    //         s.add('h', ['bottom','right','top','left','bottom'], 'cube', true);
    //         break;
    //       case 'backHorizontal':
    //         s.add('v', ['bottom','left','top','right','bottom'], 'cube', true);
    //         break;
    //       case 'leftVertical':
    //         s.add('h', ['bottom','front','top','back','bottom'], 'cube', true);
    //         break;
    //       case 'leftHorizontal':
    //         s.add('v', ['bottom','back','top','front','bottom'], 'cube', true);
    //         break;
    //       case 'rightVertical':
    //         s.add('h', ['bottom','front','top','back','bottom'], 'cube', true);
    //         break;
    //       case 'rightHorizontal':
    //         s.add('v', ['bottom','back','top','front','bottom'], 'cube', true);
    //         break;
    //     }
    //   }
    // };
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
    var settings = {
      after: function(e) { changeSlide(e.in.slidr); },
      fade: false,
      keyboard: true,
      overflow: true,
      theme: '#323232',
      timing: { 'cube': '0.7s ease-in-out' },
      touch: true,
      transition: 'cube'
    };

    s.createSlide = create;
    // s.readSlide = read;
    // s.updateSlide = update;
    return s;

  });