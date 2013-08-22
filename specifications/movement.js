var _ = require('underscore');
var Game = require('../lib/game')

describe('movement', function () {
  it('cant move to occupied square', function () {
    Game.join({ id: "clif" });
    Game.join({ id: "amir" });

    var clif = Game.findUnitbyId('clif');
    var amir = Game.findUnitbyId('amir');

    clif.x = 0;
    clif.y = 0;
    amir.x = 0;
    amir.y = 1;

    var hasMoved = !!Game.move(clif, amir.x, amir.y);
    expect(hasMoved).toBe(false);
    expect(clif.x).toBe(0);
    expect(clif.y).toBe(0);

    hasMoved = !!Game.move(amir, amir.x + 1, amir.y);
    expect(hasMoved).toBe(true);
    expect(amir.x).toBe(1);
    expect(amir.y).toBe(1);
    expect(amir.direction).toBe('e');
  });

  it('checks movement range', function () {
    Game.join({ id: "user1" });
    var unit = Game.findUnitbyId("user1");

    unit.x = 0;
    unit.y = 0;

    var hasMoved = !!Game.move(unit, unit.x + 8, unit.y);
    expect(hasMoved).toBe(false);

    hasMoved = !!Game.move(unit, unit.x + 1, unit.y);
    expect(hasMoved).toBe(true);
  });

  it('cant move twice', function () {
    Game.join({ id: "user1" });

    var unit = Game.findUnitbyId("user1");

    unit.x = 81;
    unit.y = 85;

    var hasMoved = !!Game.move(unit, 80, 85);

    // test success
    expect(unit.x).toBe(80);
    expect(unit.y).toBe(85);
    expect(hasMoved).toBe(true);

    // test failure
    unit = Game.findUnitbyId("user1");
    hasMoved = !!Game.move(unit, unit.x - 2, 0);

    expect(unit.x).toBe(80);
    expect(unit.y).toBe(85);
    expect(hasMoved).toBe(false);
  });
});
