'use strict';

import _ from 'lodash';
import Versions from './version.model';
import config from '../../config/environment';

// Gets a list of versions
export function getAllByDate() {
  return Versions.find().sort('-date').exec();
}

function buildStoriesObject(stories) {
  return _.map(stories, (story) => {
    return {
      key: story,
      url: config.jira.storiesUrl + story
    }
  });
}

// Save version
export function saveVersion(version) {
  version.stories = buildStoriesObject(version.stories);
  return Versions.create(version);
}


// Update version
export function updateVersion(version) {
  return function(entity) {
    version.stories = buildStoriesObject(version.stories);
    let updated = entity;
    updated.date = version.date;
    updated.stories = version.stories;
    updated.updated = new Date();
    return updated.save()
    .then(updated => {
      return updated;
    });
  };
}
