var _ = require('underscore');
var rules = require('../public/javascripts/rules');
var radius = require('../public/javascripts/radius.js');

var units = { };


function spawnCrystal(name) {
  var unit = { };

  unit.id = name;
  unit.x = Math.floor(Math.random() * 10);
  unit.y = Math.floor(Math.random() * 10);
  unit.type = 'knight';
  unit.lastMove = 0;
  unit.lastAttack = 0;
  unit.timeOfDeath = now() - 15000;
  unit.timeToCrystal = 0;
  unit.hp = 0;
  unit.owner = "the game owns this";

  while(unitExists(unit.x, unit.y)) {
    unit.x = Math.floor(Math.random() * 10);
    unit.y = Math.floor(Math.random() * 10);
  }

  units[unit.id] = unit;

  return unit;
}

function join(unit) {
  unit.x = Math.floor(Math.random() * 10);
  unit.y = Math.floor(Math.random() * 10);
  unit.type = 'knight';
  unit.lastMove = 0;
  unit.lastAttack = 0;
  unit.timeOfDeath = -1;
  unit.timeToCrystal = -1;
  unit.hp = 100;

  while(unitExists(unit.x, unit.y)) {
    unit.x = Math.floor(Math.random() * 10);
    unit.y = Math.floor(Math.random() * 10);
  }

  turnUnitTowards(unit, 4, 4);

  units[unit.id] = unit;

  return unit;
}

function now() {
  return new Date().getTime();
}

function world() {
  var world = {units: {}};

  for (var id in units) {
    var unit = units[id];
    world.units[id] = {
      id: id,
      type: unit.type,
      x: unit.x,
      y: unit.y,
      moveCooldown: unitMoveCooldown(unit),
      attackCooldown: unitAttackCooldown(unit),
      timeOfDeath: unit.timeOfDeath,
      hp: unit.hp,
      direction: unit.direction,
      isDead: isDead(unit),
      isCrystal: isCrystal(unit),
      owner: unit.owner
    };
  }

  return world;
}

function isDead(unit) {
  return unit.hp <= 0;
}

function crystalize(unit) {
  unit.owner = '';
}

function isCrystal(unit) {
  if(!isDead(unit)) return false;

  var timeOfConversion = unit.timeOfDeath + rules.crystalizeDelay;

  var timeLeft = timeOfConversion - now();

  return timeLeft <= 0;
}

function unitMoveCooldown(unit) {
  var nextMove = unit.lastMove + rules.units[unit.type].moveCooldown;
  var timeleft = nextMove - now();

  if (unit.lastMove == 0 || timeleft < 0) {
    return 0;
  } else {
    return timeleft;
  }
}

function unitAttackCooldown(unit) {
  var nextAttack = unit.lastAttack + rules.units[unit.type].attackCooldown;
  var timeleft = nextAttack - now();

  if (unit.lastAttack == 0 || timeleft < 0) {
    return 0;
  } else {
    return timeleft;
  }
}

function findUnitByCoords(x, y) {
  for(var id in units) {
    if(units[id].x == x && units[id].y == y) {
      return units[id];
    }
  }
}

function findUnitsByOwner(owner) {
  return _(units).filter(function (u) { return u.owner === owner });
}

function unitExists(x, y) {
  return !!findUnitByCoords(x, y);
}

function move(unit, x, y) { 
  if (!unitCanMove(unit, x, y)) return false;

  turnUnitTowards(unit, x, y);
  consumeCrystal(unit, x, y);

  unit.x = x;
  unit.y = y;

  unit.lastMove = now();


  return unit;
}

function consumeCrystal(unit, x, y) {
  if(crystalExists(x, y)) {
    //is full health
    if(unit.hp >= rules.units[unit.type].hp) {
      unit.hp = unit.hp += 20; //bonus hp
    } else {
      unit.hp = rules.units[unit.type].hp; //restore hp
    }

    var crystalUnit = findUnitByCoords(x, y);
    delete units[crystalUnit.id];
  }
}

function crystalExists(x, y) {
  if (unitExists(x, y))
  {
    var existingUnit = findUnitByCoords(x, y);

    return isCrystal(existingUnit);
  }

  return false;
}

function unitCanMove(unit, x, y) {
  if (isDead(unit)) return false;

  if (unitExists(x, y))
  {
    var existingUnit = findUnitByCoords(x, y);

    if(!isCrystal(existingUnit)) return false;
  }

  var moveRange = rules.units[unit.type].moveRange;

  if (getRange(unit, x, y) > moveRange) return false;

  var moveCooldown = rules.units[unit.type].moveCooldown;

  return unit.lastMove + moveCooldown < now();
}

function unitCanAttack(unit, x, y) {
  if (unit.x === x && unit.y === y) return false;

  if (!unitExists(x, y)) return false;

  if (isDead(unit)) return false;

  var attackRange = rules.units[unit.type].attackRange;

  if (getRange(unit, x, y) > attackRange) return false;

  var attackCooldown = rules.units[unit.type].attackCooldown;

  return unit.lastAttack + attackCooldown < now();
}

function attack(unit, x, y) {
  if (!unitCanAttack(unit, x, y))
  {
    return false;
  }

  var target = findUnitByCoords(x, y);

  if (target && target.hp <= 0) return false;

  turnUnitTowards(unit, x, y);

  var unitDamage = rules.units[unit.type].attackDamage;

  target.hp = target.hp - unitDamage;

  target.hp = target.hp - calcBonus(unit, target);

  if(target.hp < 0) target.hp = 0;

  if(isDead(target)) {
    target.timeOfDeath = now();
    target.owner = '';
    setTimeout(function() {
      crystalize(target);
    }, rules.crystalizeDelay);
  }

  unit.lastAttack = now();

  return target;
}

function calcBonus(unit, target) {
  if(unit.direction == target.direction) { //attack from back
    return Math.floor(rules.units[unit.type].attackDamage * 0.50);
  }

  var opposite = '';

  if(unit.direction == 'n') opposite = 's';

  if(unit.direction == 's') opposite = 'n';

  if(unit.direction == 'e') opposite = 'w';

  if(unit.direction == 'w') opposite = 'e';

  //attack from front
  if(target.direction == opposite) {
    return 0;
  }

  //attack from side
  return Math.floor(rules.units[unit.type].attackDamage * 0.25);
}

function turnUnitTowards(unit, x, y) {
  if(unit.x < x)
  {
    unit.direction = 'e';
    return;
  }

  if(unit.x > x)
  {
    unit.direction = 'w';
    return;
  }

  if(unit.y > y)
  {
    unit.direction = 's';
    return;
  }

  if(unit.y < y)
  {
    unit.direction = 'n';
    return;
  }
}

function getRange(unit, x, y) {
  var delta_x = Math.abs(unit.x - x);
  var delta_y = Math.abs(unit.y - y);

  return delta_x + delta_y;
}

function findUnitbyId(id) { return units[id]; }

exports.attack = attack;
exports.join = join;
exports.world = world;
exports.unitExists = unitExists;
exports.findUnitbyId = findUnitbyId;
exports.move = move;
exports.spawnCrystal = spawnCrystal;
exports.findUnitsByOwner = findUnitsByOwner
