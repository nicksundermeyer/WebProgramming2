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
    this.getReviewData();
  }

  updateUser(user) {
    this.$uibModal.open({
      template: require('../../components/updateUserModal/updateUserModal.html'),
      controller: 'updateUserController as updateUserController',
      resolve: {
        user: () => user
      }
    })
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
        this.recipes = response.data;
      })
      .catch(error => {
        console.error(error);
      })
  }
  getReviewData() {
    this.Review.getAllReviews()
      .then(response => {
        this.reviews = response.data;
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
    console.log('testing');
    $location.url('/users/' + user._id);
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
  .service('Recipe', RecipeService)
  .service('Review', ReviewService)
  .name;

// function which provides service for retrieving recipes
export function RecipeService($http) {
  'ngInject';
  var Recipe = {
    getAllRecipes() {
      return $http.get('/api/recipes');
    },
    getRecipeByID(id) {
      return $http.get('/api/recipes/' + id);
    }
  }
  return Recipe;
}

// function which provides service for retrieving reviews
export function ReviewService($http) {
  'ngInject';
  var Review = {
    getAllReviews() {
      // won't actually work to get reviews, no route setup to get all reviews
      return $http.get('/api/recipes/');
    },
    getReviewByID(recipeid, reviewid) {
      return $http.get('/api/recipes/' + recipeid + '/reviews/' + reviewid);
    }
  }
  return Review;
}