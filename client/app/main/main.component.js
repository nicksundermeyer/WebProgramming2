import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';
const uiBootstrap = require('angular-ui-bootstrap');
import user from '../../components/userService/user.module';

export class MainController {
  /*@ngInject*/
  constructor($http, User, $uibModal) {
    this.$http = $http;
    this.$uibModal = $uibModal;
    this.User = User;
    this.setData();
    this.getUserData();
  }

  $onInit() {

  }

  setData() {
    this.values = ['first', 'second', 'third'];
    this.valueToSquare = 4;
  }

  getUserData() {
    // important to use => with promise chain to correctly scope function
    // in this case, makes sure function is in same scope as Controller
    this.User.getAllUsers()
      .then(response => {
        this.users = response;
      })
      .catch(error => {
        console.error(error);
      })
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
}

export default angular.module('comp3705App.main', [ngRoute, uiBootstrap, user])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainController'
  })
  .name;