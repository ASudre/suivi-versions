'use strict';

(function() {

  class MainController {

    constructor($http) {
      this.$http = $http;
      this.versions = [];
      this.newVersion = '';
    }

    $onInit() {
      this.$http.get('/api/versions')
        .then(response => {
          this.versions = response.data;
        });
    }

    addVersion() {
      console.log('version :', this.newVersion);
      if (this.newVersion) {
        this.$http.post('/api/version', {
          version: this.newVersion
        });
        this.newVersion = '';
      }
    }

    deleteVersion(version) {
      this.$http.delete('/api/version/' + version._id);
    }
  }

  angular.module('suiviVersionsApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
