'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {type: String, required: true, unique: true, index: true},
  profileImg: { type: String, default: ""},
  messages: [{ content: String, time: Date}],
  createdAt: { type: Date, required: true},
  isActive: {type: Boolean, default: true}
});

mongoose.model('User', UserSchema);