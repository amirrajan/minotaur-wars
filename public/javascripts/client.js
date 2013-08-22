(function(){
var _joinedOnce = false;

function Client( id ) {
  this.id = id;
  this.socket = io.connect();
  this.username = null;
  this.initialize();
}

Client.prototype = {

  initialize: function() {
    this.id = Math.ceil( Math.random()*10000 );
    this.socket.on('world', _onWorld);      // Server sent world data.
    this.socket.on('joined', _onJoined)     // Server acknowledged and accepted my join request.
    this.socket.on('move result', _onMoved);       // Server responded to my move request.
    this.socket.on('attack result', _onAttacked);  // Server responded to my attack request.
    this.socket.on('death', _onDeath);        // Server told me that I'm dead.
    this.socket.on('username', _onUsername); // Server responded with username
    this.socket.on('message', _onMessage);
    this.socket.on('scoreboard', _onScoresReceived);
    this.socket.on('unit is attacking', _onUnitIsAttacking);
  },

  // Send the server a join request. 
  join: function() {
    this.socket.emit('join');
  },

  sendMessage: function (message) {
    this.socket.emit('message', message);
  },

  // Send the server a move request.
  move: function (id, x, y) {
    this.socket.emit('move', { 
        id: id,
        x : x,
        y : y
    });
  },

  // Send the server an attack request.
  attack: function(id, x, y) {
    this.socket.emit('attack', { 
        id: id,
        x : x,
        y : y
    });
  },

  hasLiveUnits: function() {
    var username = this.username
      , units = Tactics.Data.Units.filter(
        function(unit){
          return unit.get('owner') == username && !unit.get('IsCrystal') && !unit.get('IsDead')
        });

    return units.length > 0;
  }

};

/* `Handlers
/******************************/
function _onWorld(data){
  Tactics.Data.Units.reset(data.units);

  if (!Tactics.client.username) return;

  var mine = [];

  // Which units belong to me
  for (var p in data.units ){
    if (data.units.hasOwnProperty(p))
      if (data.units[p].owner == Tactics.client.username)
        mine.push(data.units[p]);
  }

  _joinedOnce && !Tactics.client.hasLiveUnits() && Tactics.emitter.trigger('all dead');
};

function _onMessage(event) {
  Tactics.Data.Chats.add(event);
}

function _onUsername(username){
  Tactics.client.username = username;

  Tactics.client.join();
};

function _onJoined(data){
  _joinedOnce = true;
};

function _onMoved(data){
  Tactics.emitter.trigger('move result', data);
};

function _onAttacked(data){
  Tactics.Assets.sounds.hit1.play();
  Tactics.emitter.trigger('attack result', data);
};

function _onDeath(data){
  Tactics.Assets.playDeathSound();
}

function _onScoresReceived(data){
  Tactics.Data.Leaders.reset(data);
}

function _onUnitIsAttacking(data){
  var animId = data.x + '_' + data.y;
  Tactics.Map.attackAnimationQueue[animId] = {
    cell: { row: data.x, column: data.y },
    unit: data,
    step: 0
  };
}

/* `Instantiation
/******************************/
Tactics.emitter.on('assets-loaded',
   function(){
    Tactics.client = new Client();
  });
})();
