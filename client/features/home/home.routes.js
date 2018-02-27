import homeHtml from './home.html';

export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      template: homeHtml,
      controller: 'HomeController',
      controllerAs: 'home'
    });
}

routes.$inject = ['$stateProvider'];
