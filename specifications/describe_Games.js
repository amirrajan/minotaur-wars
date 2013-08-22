var _ = require('underscore');
var Game = require('../lib/game.js')

describe('tactics', function() {
  it('join', function() {
    Game.join({ id: "user1" });

    var unit = Game.world().units["user1"];

    expect(unit).toNotBe(null);

    expect(unit.direction).toNotBe(null);
  });

  it('unit exists?', function() {
    Game.join({ id: "user1" });

    var unit = Game.world().units["user1"];

    var exists = Game.unitExists(unit.x, unit.y);

    expect(exists).toBe(true);
  });
});
