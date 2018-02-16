'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/users', {
    template: '<userdetails></userdetails>'
  });

  $routeProvider.when('/users/:id', {
    template: '<userdetails></userdetails>'
  });
}