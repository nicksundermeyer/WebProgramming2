import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  /*@ngInject*/
  constructor($uibModal, $http, User, Recipe, Review) {
    this.$http = $http;
    this.$uibModal = $uibModal;
    this.User = User;
    this.Recipe = Recipe;
    this.Review = Review;
    this.getUserData();
    this.getRecipeData();
    // this.getReviewData();
  }

  createUser(user) {
    this.$uibModal.open({
      template: require('../../components/createUserModal/createUserModal.html'),
      controller: 'createUserController as createUserController',
      resolve: {
        user: () => user
      }
    })
  }

  createRecipe(recipe) {
    this.$uibModal.open({
      template: require('../../components/createRecipeModal/createRecipeModal.html'),
      controller: 'createRecipeController as createRecipeController',
      resolve: {
        recipe: () => recipe
      }
    })
  }

  getUserData() {
    this.User.getAllUsers()
      .then(response => {
        this.users = response;
      })
      .catch(error => {
        console.error(error);
      })
  }
  getRecipeData() {
    this.Recipe.getAllRecipes()
      .then(response => {
        this.recipes = response;
      })
      .catch(error => {
        console.error(error);
      })
  }
  getReviewData() {
    this.Review.getAllReviews()
      .then(response => {
        this.reviews = response;
      })
      .catch(error => {
        console.error(error);
      })
  }
}

// creating bootstrap functions for collapse
function CollapseDemoCtrl($scope) {
  $scope.isNavCollapsed = true;
  $scope.isCollapsed = false;
  $scope.isCollapsedHorizontal = false;
}

function LinkControl($scope, $location) {
  $scope.LinkUser = function (user) {
    $location.url('/users/' + user._id);
  }
  $scope.LinkRecipe = function (recipe) {
    $location.url('/recipes/' + recipe._id);
  }
}

LinkControl.$inject = ["$scope", "$location"];
CollapseDemoCtrl.$inject = ["$scope"];

export default angular.module('comp3705App.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainController'
  })
  .controller('CollapseDemoCtrl', CollapseDemoCtrl)
  .controller('LinkControl', LinkControl)
  .name;