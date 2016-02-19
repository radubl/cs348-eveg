'use strict';

/* Controllers */

var evegControllers = angular.module('evegControllers', []);

evegControllers.controller('ShopController', ['$scope',
	function($scope) {

		$scope.cart = {};

		var products = getProductDetails();
		$scope.products = Object.keys(products).map(function (key) {return products[key]});

		for (var i = 0; i < $scope.products.length; i++) {
			$scope.cart[$scope.products[i]['name']] = 0;
		}

		// console.log($scope.products)

		$scope.getProductImage = function(name) {
			return products[name.toLowerCase()]['image'];
		}

	}]);

evegControllers.controller('PhoneListCtrl', ['$scope',
	function($scope) {

		$scope.orderProp = 'age';

	}]);

evegControllers.controller('ShopCtrl', ['$scope', 'Phone', 'Stock', '$http',
	function($scope, Phone, Stock, $http) {
		$scope.cartID = -1;
		$scope.itemsBought = 0;
		$scope.itemsCost = 0.00;

		$scope.cart = {};

		$scope.phones = Phone.query();

		$scope.phoneObject = {};

		console.log($scope.phones);

		$.each($scope.phones, function (index,item) {
			$scope.phoneObject[item[id]] = item;
			console.log(item);
		});
		console.log($scope.phoneObject);

		$scope.stock = Stock.query();

		$scope.orderProp = 'age';

		$scope.addToCart = function (item) {
			modifyCart(item,1);
		};

		$scope.subtractFromCart = function (item) {
			modifyCart(item,-1);
		};

		$scope.removeFromCart = function (item) {
			modifyCart(item,0);
		};

		function modifyCart (item,quantity) {

			var newCart = $.extend(true, {}, $scope.cart);

			if ($scope.stock[item] == 0 && quantity > 0)
				return;

			if (!newCart.hasOwnProperty(item))
				newCart[item] = quantity;
			else
				newCart[item] += quantity;

			$scope.itemsBought += quantity;

			if (quantity == 0)
			{
				quantity = -newCart[item];
				$scope.itemsBought += quantity;
				delete newCart[item];
			}


			if ($scope.cartID < 0)
				$http({
					method: 'POST',
					url: '/cart'
				}).then(function successCallback(response) {
					console.log(response);
					$scope.cartID = response.data.id;
					appendToCart ()
					}, function errorCallback(response) {
						bootbox.alert(response.data.error)
					});
			else
				appendToCart ();

			function appendToCart () {
				$http({
					method: 'PUT',
					url: '/cart',
					params : { id : $scope.cartID },
					data : newCart
				}).then(function successCallback(response) {
						$scope.stock[item] -= quantity;
					}, function errorCallback(response) {
						newCart[item] -= quantity;
						$scope.itemsBought -= quantity;
						bootbox.alert(response.data.error);
					});

				$scope.cart = newCart;
			}
		}

	}]);

evegControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
	function($scope, $routeParams, Phone) {
		$scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
			$scope.mainImageUrl = phone.images[0];
		});

		$scope.setImage = function(imageUrl) {
			$scope.mainImageUrl = imageUrl;
		};
	}]);
