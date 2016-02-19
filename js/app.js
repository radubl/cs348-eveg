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
        scope: { product: '=' , cart: '='},
        // transclude: true,
        templateUrl: 'partials/product-box.html',
         controller: ['$scope', function($scope) {

        $scope.addToCart = function (item) {
          modifyCart(item,1);
        };

        $scope.subtractFromCart = function (item) {
          modifyCart(item,-1);
        };

        $scope.deleteFromCart = function (item) {
          modifyCart(item,0);
        };

        function modifyCart (item,quantity) {
          console.log('adding to cart ' + item + ' in quantity ' + quantity)
          if (quantity == 0)
            $scope.cart[item] = quantity; 
          else
            $scope.cart[item] += quantity;
            if ($scope.cart[item] < 0)
              $scope.cart[item] = 0;

        }
        }]
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
