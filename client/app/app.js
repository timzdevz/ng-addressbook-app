'use strict';

angular.module('addressBookApp', [
  'ngResource',
  'ngRoute'
])
  .value('toastr', window.toastr)
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/partials/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
