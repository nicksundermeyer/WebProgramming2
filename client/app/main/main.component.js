import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  /*@ngInject*/
  constructor($http, User, Recipe, Review) {
    this.$http = $http;
    this.User = User;
    this.Recipe = Recipe;
    this.Review = Review;
    this.getUserData();
    this.getRecipeData();
    this.getReviewData();
  }

  getUserData() {
    // important to use => with promise chain to correctly scope function
    // in this case, makes sure function is in same scope as Controller
    this.User.getAllUsers()
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error(error);
      })
  }
  getRecipeData() {
    // important to use => with promise chain to correctly scope function
    // in this case, makes sure function is in same scope as Controller
    this.Recipe.getAllRecipes()
      .then(response => {
        this.recipes = response.data;
      })
      .catch(error => {
        console.error(error);
      })
  }
  getReviewData() {
    // important to use => with promise chain to correctly scope function
    // in this case, makes sure function is in same scope as Controller
    this.Review.getAllReviews()
      .then(response => {
        this.reviews = response.data;
      })
      .catch(error => {
        console.error(error);
      })
  }
}

export default angular.module('comp3705App.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainController'
  })
  .service('User', UserService)
  .service('Recipe', RecipeService)
  .service('Review', ReviewService)
  .name;

angular.module('ui.bootstrap.demo').controller('CollapseDemoCtrl', function ($scope) {
  $scope.isNavCollapsed = true;
  $scope.isCollapsed = false;
  $scope.isCollapsedHorizontal = false;
});

// function which provides service for retrieving users
export function UserService($http) {
  'ngInject';
  var User = {
    getAllUsers() {
      return $http.get('/api/users/');
    },
    getUserByID(id) {
      return $http.get('/api/users/' + id);
    }
  }
  return User;
}

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