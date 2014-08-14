'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MsgSchema = new Schema({
  content: String
});

mongoose.model('Msg', MsgSchema);