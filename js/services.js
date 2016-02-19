'use strict';

/* Services */

var evegServices = angular.module('evegServices', ['ngResource']);

evegServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);

evegServices.factory('Stock', ['$resource',
  function($resource){
    return $resource('/stock', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }]);
