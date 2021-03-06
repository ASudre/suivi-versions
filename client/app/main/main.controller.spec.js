'use strict';

describe('Component: mainComponent', function() {

  // load the controller's module
  beforeEach(module('suiviVersionsApp'));

  var scope;
  var mainComponent;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/versions')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    mainComponent = $componentController('main', {
      $http: $http,
      $scope: scope
    });
  }));

  it('should initialize newVersion in the controller', function() {
    mainComponent.$onInit();
    $httpBackend.flush();
    expect(mainComponent.newVersion.stories)
      .to.equal('');
  });
});
