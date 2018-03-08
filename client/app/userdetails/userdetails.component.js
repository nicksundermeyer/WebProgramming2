import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './userdetails.routes';
import { UserService } from '../main/main.component';

export class UserDetailsController {
  /*@ngInject*/
  // appconfig from shared.js
  constructor($uibModal, $routeParams, User) {
    this.id = $routeParams.id;
    this.User = User;
    this.$uibModal = $uibModal;

    this.User.getUserById(this.id)
      .then(response => {
        this.user = response;
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

  deleteUser(user) {
    this.$uibModal.open({
      template: require('../../components/deleteUserModal/deleteUserModal.html'),
      controller: 'deleteUserController as deleteUserController',
      resolve: {
        user: () => user
      }
    })
  }

  $onInit() { }

}

export default angular.module('comp3705App.userdetails', [ngRoute])
  .config(routing)
  .component('userdetails', {
    template: require('./userdetails.html'),
    controller: UserDetailsController,
    controllerAs: 'userDetailsController'
  })
  .service('User', UserService)
  .name;