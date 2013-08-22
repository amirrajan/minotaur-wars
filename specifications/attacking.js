var _ = require('underscore');
var Game = require('../lib/game.js')

describe('attacks', function () {
  it('normal damage from front', function() {
    Game.join({id: 'amir'});
    Game.join({id: 'clif'});

    var amir = Game.findUnitbyId('amir');
    var clif = Game.findUnitbyId('clif');

    var init_hp = clif.hp;

    amir.x = 0;
    amir.y = 0;
    amir.direction = 'n';

    clif.x = 0;
    clif.y = 1;

    Game.attack(clif, amir.x, amir.y);
    amir = Game.findUnitbyId('amir');
    clif = Game.findUnitbyId('clif');
    expect(amir.hp).toBe(70);
    expect(clif.direction).toBe('s');
  });

  it('from the back does 10% more damage', function() {
    Game.join({id: 'amir'});
    Game.join({id: 'clif'});

    var amir = Game.findUnitbyId('amir');
    var clif = Game.findUnitbyId('clif');

    var init_hp = clif.hp;

    amir.x = 0;
    amir.y = 0;
    amir.direction = 'n';

    clif.x = 0;
    clif.y = 1;
    clif.direction = 'n';

    Game.attack(amir, clif.x, clif.y);
    amir = Game.findUnitbyId('amir');
    clif = Game.findUnitbyId('clif');
    expect(clif.hp).toBe(55);
    expect(amir.direction).toBe('n');
    expect(clif.direction).toBe('n');
  });

  it('from the side does 5% more damage', function() {
    Game.join({id: 'amir'});
    Game.join({id: 'clif'});

    var amir = Game.findUnitbyId('amir');
    var clif = Game.findUnitbyId('clif');

    var init_hp = clif.hp;

    amir.x = 0;
    amir.y = 0;
    amir.direction = 'n';

    clif.x = 0;
    clif.y = 1;
    clif.direction = 'e';

    Game.attack(amir, clif.x, clif.y);
    amir = Game.findUnitbyId('amir');
    clif = Game.findUnitbyId('clif');
    expect(clif.hp).toBe(63);
    expect(amir.direction).toBe('n');
    expect(clif.direction).toBe('e');
  });

  it('checks range before attacking', function () {
    Game.join({id: 'amir'});
    Game.join({id: 'clif'});

    var amir = Game.findUnitbyId('amir');
    var clif = Game.findUnitbyId('clif');

    amir.x = 0;
    amir.y = 4;

    clif.x = 0;
    clif.y = 2;

    var hasAttacked = !!Game.attack(amir, clif.x, clif.y);

    expect(hasAttacked).toBe(false);
  });

  it('check enemy exists', function () {
    Game.join({id: 'amir'});
    Game.join({id: 'clif'});

    var amir = Game.findUnitbyId('amir');
    var clif = Game.findUnitbyId('clif');

    amir.x = 0;
    amir.y = 0;

    clif.x = 1;
    clif.y = 0;

    // should not be able to attack self
    var hasAttacked = !!Game.attack(amir, 0, 0);
    expect(hasAttacked).toBe(false);

    // should not be able to attack self
    hasAttacked = !!Game.attack(amir, 1, 0);
    expect(hasAttacked).toBe(true);
  });

  it('attacks reduce hp', function () {
    Game.join({id: 'amir'});
    Game.join({id: 'clif'});
    Game.join({id: 'josh'});
    Game.join({id: 'eric'});

    var amir = Game.findUnitbyId('amir');
    var clif = Game.findUnitbyId('clif');
    var josh = Game.findUnitbyId('josh');
    var eric = Game.findUnitbyId('eric');

    var init_hp = clif.hp;

    amir.x = 3;
    amir.y = 3;

    clif.x = 4;
    clif.y = 3;

    josh.x = 3;
    josh.y = 4;

    eric.x = 3;
    eric.y = 2;

    var hasAttacked = attack(amir, clif);
    expect(hasAttacked).toBe(true);
    expect(clif.hp < init_hp).toBe(true);
    amir = Game.findUnitbyId('amir');
    expect(amir.direction).toBe('e');

    attack(clif, amir);
    clif = Game.findUnitbyId('clif');
    expect(clif.direction).toBe('w');

    attack(josh, amir);
    josh = Game.findUnitbyId('josh');
    expect(josh.direction).toBe('s');

    attack(eric, amir);
    eric = Game.findUnitbyId('eric');
    expect(eric.direction).toBe('n');
  });

  function attack(unit, other) {
    return !!Game.attack(unit, other.x, other.y);
  }
});
