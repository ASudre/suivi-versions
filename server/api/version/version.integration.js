'use strict';

var app = require('../..');
import request from 'supertest';
import config from '../../config/environment'

let newVersion;
const now = new Date();

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
          date: now,
          stories: [
            'FTOREPROBO-460',
            'FTOREPROBO-461'
          ]
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
      expect(new Date(newVersion.date).toTimeString()).to.equal(now.toTimeString());
      expect(newVersion.stories.length).to.equal(2);
      expect(newVersion.stories[0].key).to.equal('FTOREPROBO-460');
      expect(newVersion.stories[0].url).to.equal(config.jira.storiesUrl + 'FTOREPROBO-460');
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
      expect(new Date(version.date).toTimeString()).to.equal(now.toTimeString());
      expect(version.stories.length).to.equal(2);
      expect(version.stories[0].key).to.equal('FTOREPROBO-460');
      expect(version.stories[0].url).to.equal(config.jira.storiesUrl + 'FTOREPROBO-460');
    });

  });

  describe('PUT /api/versions/:id', function() {
    var updatedVersion;
    const updatedNow = new Date();

    beforeEach(function(done) {
      request(app)
        .put('/api/versions/' + newVersion._id)
        .send({
          date: updatedNow,
          stories: [
            'FTOREPROBO-462'
          ]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedVersion = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVersion = {};
    });

    it('should respond with the updated version', function() {
      expect(new Date(updatedVersion.date).toTimeString()).to.equal(updatedNow.toTimeString());
      expect(updatedVersion.stories.length).to.equal(1);
      expect(updatedVersion.stories[0].key).to.equal('FTOREPROBO-462');
      expect(updatedVersion.stories[0].url).to.equal(config.jira.storiesUrl + 'FTOREPROBO-462');
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
