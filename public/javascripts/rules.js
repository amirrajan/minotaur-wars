(function () {
  var rules = {
    crystalizeDelay: 12000,
    units: {
      knight: {
        moveCooldown: 3000,
        attackCooldown: 3000,
        attackDamage: 30,
        hp: 100,
        attackRange: 1,
        moveRange: 3
      }
    }
  }

  if (typeof window === 'undefined') {
    module.exports = rules;
  } else {
    window.Tactics.rules = rules;
  }
})();
