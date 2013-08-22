var config = require('./config');

var redis = require('redis')
  .createClient(config.redis.port, config.redis.host);
var _ = require('underscore')._;

var EventEmitter = require('events').EventEmitter;

function Scoreboard() {
  var self = this;

  if (config.redis.auth) redis.auth(config.redis.auth);
}

Scoreboard.prototype = new EventEmitter();

Scoreboard.prototype.registerKill = function (username) {
  redis.zincrby('scores', 1, username);

  var self = this;

  this.top8(username, function (err, leaders) {
    self.emit('update', leaders);
  });
};

Scoreboard.prototype.leaders = function (num, cb) {
  redis.zrevrange('scores', 0, num || -1, 'WITHSCORES', function (err, res) {
    var scores = [];
    for (var i = 0, l = res.length; i < l; i += 2) {
      scores.push({
        rank: i / 2 + 1,
        username: res[i],
        score: parseInt(res[i + 1])
      });
    }
    cb(null, scores);
  });
};

Scoreboard.prototype.clear = function () {
  redis.del('scores');
};

Scoreboard.prototype.position = function (username, cb) {
  redis.zrank('scores', username, function (err, res) {
    var rank = parseInt(res);
    if (rank) {
      cb(null, rank);
    } else {
      redis.zcount('scores', '-inf', '+inf', function (err, count) {
        cb(null, parseInt(count) + 1);
      });
    }
  });
};

Scoreboard.prototype.score = function (username, cb) {
  redis.zscore('scores', username, function (err, res) {
    cb(null, res ? parseInt(res) : 0);
  });
};

Scoreboard.prototype.top8 = function (username, cb) {
  var numScores = 8;
  var self = this;

  self.leaders(numScores, function (err, leaders) {
    var inTop8 = _(leaders).chain()
      .pluck('username')
      .include(username).value();

    if (!username || inTop8) {
      cb(null, leaders);
    } else {
      self.position(username, function (err, pos) {
        self.score(username, function (err, score) {
          var index = Math.min(leaders.length + 1, numScores) - 1;

          leaders[index] = {
            username: username,
            score: score,
            rank: pos
          };

          cb(null, leaders);
        });
      });
    }
  });
};

module.exports = new Scoreboard();
