'use strict';

import _ from 'lodash';
import Versions from './version.model';
import config from '../../config/environment';

// Gets a list of versions
export function getAllByDate() {
  return Versions.find().sort('-date').exec();
}

// Save version
export function saveVersion(version) {
  version.stories = _.map(version.stories, (story) => {
    return {
      key: story,
      url: config.jira.storiesUrl + story
    }
  });
  return Versions.create(version);
}
