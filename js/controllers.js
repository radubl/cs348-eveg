'use strict';

/* Controllers */

var evegControllers = angular.module('evegControllers', []);

evegControllers.controller('ShopController', ['$scope',
	function($scope) {

		/* products variables initialisation */

		var products = getProductDetails();
		$scope.products = Object.keys(products).map(function (key) {return products[key]});

		$scope.visibleProducts = $scope.products;

		$scope.getProductImage = function(name) {
			return products[name.toLowerCase()]['image'];
		}

		$scope.getProductPriceByQuantity = function(name,quantity) {
			return products[name.toLowerCase()]['price'] * quantity;
		}

		$scope.getProductDescription= function(name) {
			return products[name.toLowerCase()]['description'];
		}

		/* CART initialisation */

		$scope.cart = {'total' : 0, 'items' : {}};

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

          if ($scope.cart['items'][item] == undefined)
              $scope.cart['items'][item] = 0;

          if (quantity == 0)
            quantity = -$scope.cart['items'][item];
          
          $scope.cart['items'][item] += quantity;

          if ($scope.cart['items'][item] < 0)
            $scope.cart['items'][item] = 0; 
          else
            $scope.cart['total'] += quantity * products[item.toLowerCase()]['price']

        }

        $scope.getTotalItemsNumber = function (argument) {
        	var count = 0;
        	$.each($scope.cart['items'], function(item,quantity) {
        		count += quantity;
        	});
        	return count;
        }

	}]);

evegControllers.controller('SearchController', ['$scope',
	function($scope) {

        /* SEARCH bar initialisation */

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
						visibleProducts.push(item);
					}
				});

			$scope.visibleProducts = visibleProducts;
		});

	}]);

evegControllers.controller('CheckoutController', ['$scope', '$http',
	function($scope,$http) {
		$(document).on('keyup', 'input[name="houseNr"]' ,function () {

			var postcode = ($('input[name="postcode"]').val()).replace(/ /g,'');
			var nr = $(this).val();
			if (isNaN(parseInt(nr)))
				return;
			var getAddrUrl = 'https://api.getaddress.io/v2/uk/'+postcode+'/'+nr.replace(/ /g,'')+'?api-key=wPNA_PweF0i3MZgHVORq1Q3395';

			if(postcode.length == 6)
				$http({
					method: 'GET',
					url: getAddrUrl
					}).then(function successCallback(response) {
						console.log(response)
						$('input[name="address"]').val(response.data["Addresses"][0].replace(/[, ,]+/g,' ').trim());
						$('input[name="address"]').trigger('input');

					}, function errorCallback(response) {
					alert('invalid address')
					console.log(response)
					});
		});

	}]);