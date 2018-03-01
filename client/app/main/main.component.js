import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  /*@ngInject*/
  constructor($http, $uibModal, User) {
    this.$http = $http;
    this.User = User;
    this.$uibModal = $uibModal;
    this.setData();
  }

  setData() {
    this.values = ['first', 'second', 'third'];
    this.valueToSquare = 4;
  }

  $onInit() {
  }
}

export function SquareFilter() {
  var squareFunction = function(value) {
    return value * value;
  };

  return squareFunction;
}

export default angular.module('comp3705App.main', [ngRoute])
  .config(routing)
  .filter('Square', SquareFilter)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainController'
  })
  .name;
