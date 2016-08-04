'use strict';

import mongoose from 'mongoose';

var VersionSchema = new mongoose.Schema({
  number: Number,
  date: Date,
  stories: Array
});

export default mongoose.model('Version', VersionSchema);
