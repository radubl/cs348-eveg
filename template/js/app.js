'use strict';

/* App Module */

var evegApp = angular.module('evegApp', [
  'ngRoute',
  'evegAnimations',
  'evegControllers',
  'evegFilters',
  'evegServices'
]);

evegApp
.directive('header', function () {
  return {
      restrict: 'E',
      templateUrl: 'partials/header.html'
    };
})
.directive('footer', function () {
  return {
      restrict: 'E',
      templateUrl: 'partials/footer.html'
    };
})
.directive('productBox', function() {
    return {
        restrict: 'E',
        scope: { product: '=' },
        templateUrl: 'partials/product-box.html'
    };
});
evegApp.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/shop', {
        templateUrl: 'partials/shop.html',
        controller: 'ShopController'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/shop'
      });

     //  // remove the # from the URL
     // if(window.history && window.history.pushState){
     //    $locationProvider.html5Mode({
     //      enabled:true
     //    });
     //  }
  }]);
