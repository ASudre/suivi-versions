/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/versions              ->  index
 * POST    /api/versions              ->  create
 * GET     /api/versions/:id          ->  show
 * PUT     /api/versions/:id          ->  update
 * DELETE  /api/versions/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Versions from './version.model';
let versionService = require('./version.service');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of versions
export function index(req, res) {
  return versionService.getAllByDate()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Versions from the DB
export function show(req, res) {
  return Versions.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Versions in the DB
export function create(req, res) {
  return versionService.saveVersion(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Versions in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Versions.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Versions from the DB
export function destroy(req, res) {
  return Versions.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
