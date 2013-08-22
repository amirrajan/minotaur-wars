var config = require('./config');
var redis = require('redis')
  .createClient(config.redis.port, config.redis.host);
var _ = require('underscore')._;

var EventEmitter = require('events').EventEmitter;

var now = function () { (new Date()).getTime(); };

function Chatroom() {
  var self = this;

  if (config.redis.auth) redis.auth(config.redis.auth);
}

Chatroom.prototype = new EventEmitter();

Chatroom.prototype.message = function (username, message) {
  var event = { type: 'message', username: username, message: message };

  redis.rpush('chatroom', JSON.stringify(event));

  return event;
};

Chatroom.prototype.recent = function (cb) {
  redis.lrange('chatroom', -50, -1, function (err, res) {
    var events = _.map(res, function (e) { return JSON.parse(e); });
    cb(null, events);
  })
};

module.exports = new Chatroom();
