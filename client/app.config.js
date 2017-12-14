export default function routing($urlRouterProvider, $locationProvider) {
  $locaitonProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
}

routing.$inject = ['$urlRouterProvider', '$locationProvider'];
