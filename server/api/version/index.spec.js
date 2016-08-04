'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var versionsCtrlStub = {
  index: 'versionsCtrl.index',
  show: 'versionsCtrl.show',
  create: 'versionsCtrl.create',
  update: 'versionsCtrl.update',
  destroy: 'versionsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var versionsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './version.controller': versionsCtrlStub
});

describe('Versions API Router:', function() {

  it('should return an express router instance', function() {
    expect(versionsIndex).to.equal(routerStub);
  });

  describe('GET /api/things', function() {

    it('should route to thing.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'versionsCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/things/:id', function() {

    it('should route to thing.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'versionsCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/things', function() {

    it('should route to thing.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'versionsCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/things/:id', function() {

    it('should route to thing.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'versionsCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/things/:id', function() {

    it('should route to thing.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'versionsCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/things/:id', function() {

    it('should route to thing.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'versionsCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
