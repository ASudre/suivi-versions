/**
 * Version model events
 */

'use strict';

import {EventEmitter} from 'events';
import Version from './version.model';
var VersionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
VersionEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Version.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    VersionEvents.emit(event + ':' + doc._id, doc);
    VersionEvents.emit(event, doc);
  }
}

export default VersionEvents;
