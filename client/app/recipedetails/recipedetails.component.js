import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './recipedetails.routes';
import { RecipeService } from '../main/main.component';

export class RecipeDetailsController {
  /*@ngInject*/
  // appconfig from shared.js
  constructor($uibModal, $routeParams, Recipe) {
    this.id = $routeParams.id;
    this.Recipe = Recipe;
    this.$uibModal = $uibModal;

    this.Recipe.getRecipeById(this.id)
      .then(response => {
        this.recipe = response;
      })
      .catch(error => {
        console.error(error);
      })
  }

  updateRecipe(recipe) {
    this.$uibModal.open({
      template: require('../../components/updateRecipeModal/updateRecipeModal.html'),
      controller: 'updateRecipeController as updateRecipeController',
      resolve: {
        recipe: () => recipe
      }
    })
  }

  createReview(recipe, review) {
    this.$uibModal.open({
      template: require('../../components/createReviewModal/createReviewModal.html'),
      controller: 'createReviewController as createReviewController',
      resolve: {
        recipe: () => recipe,
        review: () => review
      }
    })
  }

  updateReview(recipe, review) {
    this.$uibModal.open({
      template: require('../../components/updateReviewModal/updateReviewModal.html'),
      controller: 'updateReviewController as updateReviewController',
      resolve: {
        recipe: () => recipe,
        review: () => review
      }
    })
  }


  $onInit() { }

}

function AccordionDemoCtrl($scope) {
  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function () {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };
}

function RatingDemoCtrl($scope) {
  $scope.rate = 7;
  $scope.max = 10;
  $scope.isReadonly = false;

  $scope.hoveringOver = function (value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.ratingStates = [
    { stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle' },
    { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' },
    { stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle' },
    { stateOn: 'glyphicon-heart' },
    { stateOff: 'glyphicon-off' }
  ];
}

RatingDemoCtrl.$inject = ["$scope"];
AccordionDemoCtrl.$inject = ["$scope"];

export default angular.module('comp3705App.recipedetails', [ngRoute])
  .config(routing)
  .component('recipedetails', {
    template: require('./recipedetails.html'),
    controller: RecipeDetailsController,
    controllerAs: 'recipeDetailsController'
  })
  .controller('AccordionDemoCtrl', AccordionDemoCtrl)
  .controller('RatingDemoCtrl', RatingDemoCtrl)
  .name;