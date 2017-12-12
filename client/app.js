import angular from 'angular';

angular.module('timeclock', [
  'ui.router',
])

.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/client/views/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'ctrl',
    })
    .state('option', {
      url: '/options',
      templateUrl: '/client/views/option.html',
      controller: 'OptionCtrl',
      controllerAs: 'ctrl',
    });

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
});