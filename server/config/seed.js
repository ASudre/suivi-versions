/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Version from '../api/version/version.model';

Version.find({}).remove()
  .then(() => {
    Version.create({
      number: 1,
      date: '2016-01-01',
      stories: [1, 2]
    }, {
      number: 2,
      date: '2016-01-01',
      stories: [3, 4]
    }, {
      number: 3,
      date: '2016-01-01',
      stories: [5, 6]
    }, {
      number: 4,
      date: '2016-01-01',
      stories: [7, 8]
    }, {
      number: 5,
      date: '2016-01-01',
      stories: [9, 10]
    });
  });

