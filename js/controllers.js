'use strict';

/* Controllers */

var evegControllers = angular.module('evegControllers', []);

evegControllers.controller('ShopController', ['$scope',
	function($scope) {

		$scope.cart = {'total' : 0, 'items' : {}};

		var products = getProductDetails();
		$scope.products = Object.keys(products).map(function (key) {return products[key]});

		$scope.visibleProducts = $scope.products;

		$scope.getProductImage = function(name) {
			return products[name.toLowerCase()]['image'];
		}

		$scope.search = '';
		$scope.$watch('search', function (value) {

			var visibleProducts = []

			if (value == "")
				visibleProducts = $scope.products;
			else
				$.each($scope.products, function (index, item) {

					var name = item['name'].toLowerCase();

					var check = name.indexOf(value.toLowerCase());

					if (check !== -1)
					{
						console.log(name)
						visibleProducts.push(item);
					}
				});

			// console.log(visibleProducts)

			$scope.visibleProducts = visibleProducts;
		});

	}]);

evegControllers.controller('PhoneListCtrl', ['$scope',
	function($scope) {

		$scope.orderProp = 'age';

	}]);
