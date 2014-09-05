'use strict';
var slidr;

angular.module('chatApp')
  .controller('MainCtrl', function ($scope, $timeout) {
    var s;

    var changeControls = function(e) {
      var direction = 'Horizontal';
      if ((e.in.dir === 'up') || (e.in.dir === 'down')) {
        direction = 'Vertical';
      }
      if (e.in.slidr === 'home') {
        switch(e.out.slidr+direction) {
          case 'topVertical':
            s.add('h', ['home','video','about','chat','home'], 'cube', true);
            break;
          case 'topHorizontal':
            s.add('v', ['home','chat','about','video','home'], 'cube', true);
            break;
          case 'leftVertical':
            s.add('h', ['home','tech','about','name','home'], 'cube', true);
            break;
          case 'leftHorizontal':
            s.add('v', ['home','name','about','tech','home'], 'cube', true);
            break;
          case 'bottomVertical':
            s.add('h', ['home','video','about','chat','home'], 'cube', true);
            break;
          case 'bottomHorizontal':
            s.add('v', ['home','chat','about','video','home'], 'cube', true);
            break;
          case 'rightVertical':
            s.add('h', ['home','tech','about','name','home'], 'cube', true);
            break;
          case 'rightHorizontal':
            s.add('v', ['home','name','about','tech','home'], 'cube', true);
            break;
        }
      }
      if (e.in.slidr === 'about') {
        switch(e.out.slidr+direction) {
          case 'topVertical':
            s.add('h', ['about','chat','home','video','about'], 'cube', true);
            break;
          case 'topHorizontal':
            s.add('v', ['about','video','home','chat','about'], 'cube', true);
            break;
          case 'leftVertical':
            s.add('h', ['about','name','home','tech','about'], 'cube', true);
            break;
          case 'leftHorizontal':
            s.add('v', ['about','tech','home','name','about'], 'cube', true);
            break;
          case 'bottomVertical':
            s.add('h', ['about','chat','home','video','about'], 'cube', true);
            break;
          case 'bottomHorizontal':
            s.add('v', ['about','video','home','chat','about'], 'cube', true);
            break;
          case 'rightVertical':
            s.add('h', ['about','name','home','tech','about'], 'cube', true);
            break;
          case 'rightHorizontal':
            s.add('v', ['about','tech','home','name','about'], 'cube', true);
            break;
        }
      }
      if (e.in.slidr === 'chat') {
        switch(e.out.slidr+direction) {
          case 'topVertical':
            s.add('h', ['chat','home','video','about','chat'], 'cube', true);
            break;
          case 'topHorizontal':
            s.add('v', ['chat','about','video','home','chat'], 'cube', true);
            break;
          case 'bottomVertical':
            s.add('h', ['chat','home','video','about','chat'], 'cube', true);
            break;
          case 'bottomHorizontal':
            s.add('v', ['chat','about','video','home','chat'], 'cube', true);
            break;
          case 'homeVertical':
            s.add('h', ['chat','tech','video','name','chat'], 'cube', true);
            break;
          case 'homeHorizontal':
            s.add('v', ['chat','name','video','tech','chat'], 'cube', true);
            break;
          case 'backVertical':
            s.add('h', ['chat','tech','video','name','chat'], 'cube', true);
            break;
          case 'backHorizontal':
            s.add('v', ['chat','name','video','tech','chat'], 'cube', true);
            break;
        }
      }
      if (e.in.slidr === 'video') {
        switch(e.out.slidr+direction) {
          case 'topVertical':
            s.add('h', ['video','home','chat','about','video'], 'cube', true);
            break;
          case 'topHorizontal':
            s.add('v', ['video','about','chat','home','video'], 'cube', true);
            break;
          case 'bottomVertical':
            s.add('h', ['video','home','chat','about','video'], 'cube', true);
            break;
          case 'bottomHorizontal':
            s.add('v', ['video','about','chat','home','video'], 'cube', true);
            break;
          case 'homeVertical':
            s.add('h', ['video','tech','chat','name','video'], 'cube', true);
            break;
          case 'homeHorizontal':
            s.add('v', ['video','name','chat','tech','video'], 'cube', true);
            break;
          case 'backVertical':
            s.add('h', ['video','tech','chat','name','video'], 'cube', true);
            break;
          case 'backHorizontal':
            s.add('v', ['video','name','chat','tech','video'], 'cube', true);
            break;
        }
      }
      if (e.in.slidr === 'tech') {
        switch(e.out.slidr+direction) {
          case 'homeVertical':
            s.add('h', ['tech','video','name','chat','tech'], 'cube', true);
            break;
          case 'homeHorizontal':
            s.add('v', ['tech','chat','name','video','tech'], 'cube', true);
            break;
          case 'backVertical':
            s.add('h', ['tech','video','name','chat','tech'], 'cube', true);
            break;
          case 'backHorizontal':
            s.add('v', ['tech','chat','name','video','tech'], 'cube', true);
            break;
          case 'leftVertical':
            s.add('h', ['tech','home','name','about','tech'], 'cube', true);
            break;
          case 'leftHorizontal':
            s.add('v', ['tech','about','name','home','tech'], 'cube', true);
            break;
          case 'rightVertical':
            s.add('h', ['tech','home','name','about','tech'], 'cube', true);
            break;
          case 'rightHorizontal':
            s.add('v', ['tech','about','name','home','tech'], 'cube', true);
            break;
        }
      }
      if (e.in.slidr === 'name') {
        switch(e.out.slidr+direction) {
          case 'homeVertical':
            s.add('h', ['name','video','tech','chat','name'], 'cube', true);
            break;
          case 'homeHorizontal':
            s.add('v', ['name','chat','tech','video','name'], 'cube', true);
            break;
          case 'backVertical':
            s.add('h', ['name','video','tech','chat','name'], 'cube', true);
            break;
          case 'backHorizontal':
            s.add('v', ['name','chat','tech','video','name'], 'cube', true);
            break;
          case 'leftVertical':
            s.add('h', ['name','home','tech','about','name'], 'cube', true);
            break;
          case 'leftHorizontal':
            s.add('v', ['name','about','tech','home','name'], 'cube', true);
            break;
          case 'rightVertical':
            s.add('h', ['name','home','tech','about','name'], 'cube', true);
            break;
          case 'rightHorizontal':
            s.add('v', ['name','about','tech','home','name'], 'cube', true);
            break;
        }
      }
    };
    var settings = {
      after: function(e) { changeControls(e); },
      fade: false,
      keyboard: false,
      overflow: true,
      theme: '#323232',
      timing: { 'cube': '0.7s ease-in-out' },
      touch: true,
      transition: 'cube'
    };

    $timeout( function() {
      s = slidr.create('plants', settings);
      // calling $scope.apply will conflict with existing digest loop
      $timeout ( function() {
        s.add('h', ['home', 'video', 'about', 'chat', 'home'], 'cube', true);
        s.add('v', ['home', 'name', 'about', 'tech', 'home'], 'cube', true);
        s.start();
      }, 0);
    }, 0);

    $scope.flip = function(side) {
      s.slide(side);
    };

  });