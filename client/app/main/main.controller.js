'use strict';

(function() {

  class MainController {

    constructor($http) {
      this.$http = $http;
      this.versions = [];
      this.newVersion = {
        date: new Date(),
        stories: ''
      };
    }

    $onInit() {
      this.getVersions();
    }

    getVersions() {
      this.$http.get('/api/versions')
        .then(response => {
          this.versions = response.data;
        });
    }

    addVersion() {
      if (this.newVersion) {
        this.newVersion.stories = this.newVersion.stories.split(/[\s,]+/);
        this.$http.post('/api/versions', this.newVersion)
        .then(() => {
          this.getVersions();
        });
      }
    }

    deleteVersion(version) {
      this.$http.delete('/api/versions/' + version._id);
    }
  }

  angular.module('suiviVersionsApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
