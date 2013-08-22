var express = require('express');
var _ = require('underscore');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
io.set('log level', 1)
var parseCookie = require('./lib/cookie_parser');
var Game = require('./lib/game');
var config = require('./lib/config');

// map of session ids -> usernames
var users = {};

io.configure(config.env, function () {
  io.set('log level', 1);
});

app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use('/public', express.static('public'));

app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: 'sooo secret'}));

app.use(app.router);

app.get('/', function (req, res) {
  var username = req.cookies.username;

  res.render('index', { username: username });
});

setInterval(function() { 
  setTimeout(function() { 
    var unit = Game.findUnitbyId("i'm a crystal")
    if(!unit) {
      Game.spawnCrystal("i'm a crystal");
      io.sockets.emit('world', Game.world());
    }
  }, Math.floor(Math.random() * 10000));

  setTimeout(function() { 
    var unit = Game.findUnitbyId("i'm also a crystal")
    if(!unit) {
      Game.spawnCrystal("i'm also a crystal");
      io.sockets.emit('world', Game.world());
    }
  }, Math.floor(Math.random() * 10000));
}, 10000);

io.sockets.on('connection', function(socket) {
  var cookies = parseCookie(socket.handshake.headers.cookie);
  var username = cookies.username;

  socket.emit('username', username);
  socket.emit('world', Game.world());

  if (username) {
    socket.on('attack', function(data) {
      var unit = Game.findUnitbyId(data.id);
      var attackSucceeded = Game.attack(unit, data.x, data.y);

      io.sockets.emit('attack result', attackSucceeded);

      if (attackSucceeded) {
        io.sockets.emit('world', Game.world());
        io.sockets.emit('unit is attacking', unit);

        var target = attackSucceeded;

        if (target.hp <= 0) {
          io.sockets.emit('death');
        }

        //emit for crystals
        setTimeout(function()
        {
          io.sockets.emit('world', Game.world());
        }, 13000);
      }
    });

    socket.on('move', function(data) {
      var unit = Game.findUnitbyId(data.id);
      var moveSucceded = Game.move(unit, data.x, data.y);
      socket.emit('move result', moveSucceded);

      if(moveSucceded) {
        io.sockets.emit('world', Game.world());
      }
    });

    socket.on('join', function() {
      var units = Game.findUnitsByOwner(username);

      if (units.length === 0) {
        Game.join({ owner: username, id: username + '-1'});
        Game.join({ owner: username, id: username + '-2'});
        Game.join({ owner: username, id: username + '-3'});
        io.sockets.emit('world', Game.world());
      }

      socket.emit('joined', true);
    });
  }
});

// auto-restart server every 2 hours
setTimeout(function () { process.exit(0); }, 2 * 60 * 60 * 1000);

server.listen(process.env.PORT || config.port);
