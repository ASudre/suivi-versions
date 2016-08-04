'use strict';

var app = require('../..');
import request from 'supertest';

var newVersion;

describe('Versions API:', function() {

  describe('GET /api/versions', function() {
    var versions;

    beforeEach(function(done) {
      request(app)
        .get('/api/versions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          versions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(versions).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/versions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/versions')
        .send({
          name: 'New Versions',
          info: 'This is the brand new version!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newVersion = res.body;
          done();
        });
    });

    it('should respond with the newly created version', function() {
      expect(newVersion.name).to.equal('New Versions');
      expect(newVersion.info).to.equal('This is the brand new version!!!');
    });

  });

  describe('GET /api/versions/:id', function() {
    var version;

    beforeEach(function(done) {
      request(app)
        .get('/api/versions/' + newVersion._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          version = res.body;
          done();
        });
    });

    afterEach(function() {
      version = {};
    });

    it('should respond with the requested version', function() {
      expect(version.name).to.equal('New Versions');
      expect(version.info).to.equal('This is the brand new version!!!');
    });

  });

  describe('PUT /api/versions/:id', function() {
    var updatedThing;

    beforeEach(function(done) {
      request(app)
        .put('/api/versions/' + newVersion._id)
        .send({
          name: 'Updated Versions',
          info: 'This is the updated version!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedThing = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedThing = {};
    });

    it('should respond with the updated version', function() {
      expect(updatedThing.name).to.equal('Updated Versions');
      expect(updatedThing.info).to.equal('This is the updated version!!!');
    });

  });

  describe('DELETE /api/versions/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/versions/' + newVersion._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when version does not exist', function(done) {
      request(app)
        .delete('/api/versions/' + newVersion._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
