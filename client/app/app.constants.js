'use strict';

import angular from 'angular';

// declaring angular constant called appConfig
// importing shared.js file into Angular for use as appConfig
export default angular.module('comp3705App.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
