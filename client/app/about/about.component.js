import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './about.routes';

export class AboutController {
  /*@ngInject*/
  // appconfig from shared.js
  constructor($routeParams, appConfig) {
    this.$routeParams = $routeParams;
    this.author = appConfig.author;
  }

  $onInit() {
    if (this.$routeParams.somethingToPrint) {
      this.valueEntered = true;
      this.somethingToPrint = this.$routeParams.somethingToPrint;
    }
    else {
      this.valueEntered = false;
    }
  }

}

export default angular.module('comp3705App.about', [ngRoute])
  .config(routing)
  .component('about', {
    template: require('./about.html'),
    controller: AboutController,
    controllerAs: 'aboutController'
  })
  .name;