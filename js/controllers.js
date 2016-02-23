'use strict';

/* Controllers */

var evegControllers = angular.module('evegControllers', []);

evegControllers.controller('ShopController', ['$scope',
	function($scope) {

		$scope.cart = {'total' : 0, 'items' : {}};

		var products = getProductDetails();
		$scope.products = Object.keys(products).map(function (key) {return products[key]});

		// for (var i = 0; i < $scope.products.length; i++) {
		// 	$scope.cart[$scope.products[i]['name']] = 0;
		// }

		// console.log($scope.products)

		$scope.getProductImage = function(name) {
			return products[name.toLowerCase()]['image'];
		}

	}]);

evegControllers.controller('PhoneListCtrl', ['$scope',
	function($scope) {

		$scope.orderProp = 'age';

	}]);


//sorry radu didn't how to do teh angular way
//but hey it works ;)
evegControllers.controller('SearchCtrl', ['$scope',
	function ($scope) {
		$scope.search = '';
		$scope.$watch('search', function (value) {
			$(".produce-box").each(function () {

				//if no value for search
				//show all boxes
				if (value == "") {
					$(this).show();
				}

				else {
					var name = $(this).find(".product-title h4 a").html().toLowerCase();
					var check = name.indexOf(value.toLowerCase());

					if (check == -1) {
						$(this).hide();
					}
				}
			})
		});
	}]);

