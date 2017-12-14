import homeHtml from './home.html';

export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: homeHtml,
      controller: 'HomeController',
      controllerAs: 'home'
    });
}

routes.$inject = ['$stateProvider'];
