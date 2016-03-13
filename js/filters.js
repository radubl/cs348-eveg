'use strict';

/* Filters */

angular.module('evegFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
})
.filter('card', function() {
  return function(input) {
  	if (input === undefined)
  		return ''
    return input.replace(/ /g,'').length > 12 ? input.substring(14) : "";
  };
});
