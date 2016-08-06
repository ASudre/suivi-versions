'use strict';

import mongoose from 'mongoose';

var VersionSchema = new mongoose.Schema({
  date: Date,
  stories: [{
    key: String,
    url: String
  }],
  updated: { type: Date, default: Date.now }
});

export default mongoose.model('Version', VersionSchema);
