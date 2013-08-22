var _ = require('underscore');
var Game = require('../lib/game.js')

describe('death to crystal', function() {
  it('after death', function() {
    Game.join({ id: "user9" });
    Game.join({ id: "user8" });

    attack("user9", "user8");
    attack("user9", "user8");
    attack("user9", "user8");
    attack("user9", "user8");
   
    var deadUnit = Game.world().units["user8"];
    expect(deadUnit.isDead).toBe(true);
    expect(deadUnit.isCrystal).toBe(false);
  });

  function attack(unitId, otherUnitId) {
    var unit = Game.findUnitbyId(unitId);
    unit.x = 9;
    unit.y = 9;
    var otherUnit = Game.findUnitbyId(otherUnitId);
    otherUnit.x = 9;
    otherUnit.y = 8;
    unit.lastAttack = 0;
    Game.attack(unit, otherUnit.x, otherUnit.y);
    otherUnit = Game.findUnitbyId(otherUnitId);
  }
});
