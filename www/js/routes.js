angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('scanner', {
    url: '/scanner',
    templateUrl: 'templates/scanner.html',
    controller: 'scannerCtrl'
  })

  .state('juiceOfTheDay', {
    url: '/juice-of-the-day',
    templateUrl: 'templates/juiceOfTheDay.html',
    controller: 'juiceOfTheDayCtrl'
  })

  .state('creditshop', {
    url: '/creditshop',
    templateUrl: 'templates/creditshop.html',
    controller: 'creditshopCtrl'
  })

  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'templates/dashboard.html',
    controller: 'dashboardCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});