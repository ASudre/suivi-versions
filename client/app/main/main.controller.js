'use strict';

(function() {

  class MainController {

    constructor($http) {
      this.$http = $http;
      this.versions = [];
      this.newVersion = {};
    }

    $onInit() {
      this.refreshVersions();
    }

    refreshVersions() {
      return this.$http.get('/api/versions')
      .then(response => {
        this.versions = response.data;
        this.newVersion = {
          date: new Date(),
          stories: ''
        };
      });
    }

    addVersion() {
      if (this.newVersion) {
        this.newVersion.stories = this.newVersion.stories.split(/[\s,]+/);
        this.$http.post('/api/versions', this.newVersion)
        .then(() => {
          this.refreshVersions();
        });
      }
    }

    deleteVersion(version) {
      this.$http.delete('/api/versions/' + version._id);
    }

    remove(versionId) {
      this.$http.delete('/api/versions/' + versionId)
      .then(() => {
        this.refreshVersions();
      });
    }

  }

  angular.module('suiviVersionsApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
