function Square(map, x, y) {
  var square = this;
  this.map = map;
  this.isHazard = false;
  this.x = x;
  this.y = y;

  this.right = function() {
    return square.map.findOrAdd(square.x + 1, square.y);
  };

  this.up = function() {
    return square.map.findOrAdd(square.x, square.y + 1);
  };
  
  this.down = function() {
    return square.map.findOrAdd(square.x, square.y - 1);
  };

  this.left = function() {
    return square.map.findOrAdd(square.x - 1, square.y);
  };

  this.isLeftMostColumn = function() {
    return square.x == 0;
  };

  this.isOnBottomRow = function() {
    return square.y == 0;
  };

  this.isRightMostColumn = function() {
    return square.x == map.size - 1;
  };

  this.isOnTopRow = function() {
    return square.y == map.size - 1;
  };

  this.around = function() {
    var squares = [];

    if(!square.isRightMostColumn()) squares.push(square.right());

    if(!square.isLeftMostColumn()) squares.push(square.left());

    if(!square.isOnBottomRow()) squares.push(square.down());

    if(!square.isOnTopRow()) squares.push(square.up());

    return squares;
  };

  return square;
}

function Map() {
  var map = this;
  this.squares = [];
  this.size = 10;

  this.find = function(x, y) {
    for(var i = 0; i < map.squares.length; i++) {
      if(map.squares[i].x == x && map.squares[i].y == y)
      {
        return map.squares[i];
      }
    }

    return null;
  };

  this.findOrAdd = function(x, y) {
    var square = map.find(x, y);

    if(square == null) square = map.add(x, y);

    return square;
  };

  this.add = function(x, y) {
    var square = new Square(map, x, y);

    map.squares.push(square);

    return square;
  };

  this.addHazard = function(x, y) {
    var square = map.findOrAdd(x, y);

    square.isHazard = true;
  };

  return map;
}

function SquareFinder() {
  var squareFinder = this;
  this.size = 10; //todo: extract this to a variable some where
  this.map = new Map();
  this.availableSquares = [];
  this.visited = [];
  this.currentLocation = null;
  this.moveRadius = 3; //todo: extract this to player typ
  this.loc = function(x, y) {
    squareFinder.currentLocation = squareFinder.map.findOrAdd(x, y);
  };

  this.contains = function(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
  }
  
  this.isValidForAdd = function(square) {
    return !(square.isHazard || squareFinder.contains(squareFinder.availableSquares, square));
  };

  this.available = function(square) {
    if(squareFinder.isValidForAdd(square))
    {
      squareFinder.availableSquares.push(square);
    }
  };

  this.availableAround = function(square) {
    if(squareFinder.contains(squareFinder.visited, square)) return;

    var aroundSquares = square.around();

    for(var i = 0; i < aroundSquares.length; i++) {
      squareFinder.available(aroundSquares[i]);
    }

    squareFinder.visited.push(square);
  };

  this.hazard = function(x, y) {
    squareFinder.map.addHazard(x, y);
  };

  this.toArray = function(array) {
    var newArray = [];
    for(var i = 0; i < array.length; i++) {
      newArray.push(array[i]);
    }
    return newArray;
  };

  this.availableMoves = function() {
    squareFinder.availableSquares = [];
    squareFinder.visited = [];
    squareFinder.available(squareFinder.currentLocation);
    while(squareFinder.moveRadius > 0) {
      var staticList = squareFinder.toArray(squareFinder.availableSquares);
      for(var i = 0; i < staticList.length; i++) {
        squareFinder.availableAround(staticList[i]);
      }
      squareFinder.moveRadius--;
    }
    return squareFinder.availableSquares;
  };

  return squareFinder;
}

if(typeof window === "undefined")
{
  exports.squareFinder = function() { return new SquareFinder(); };
  exports.map = function() { return new Map(); };
  exports.square = function() { return new Square(); };
}
else
{
  window.Tactics.Radius = { };
  window.Tactics.Radius.squareFinder = function() { return new SquareFinder(); };
  window.Tactics.Radius.map = function() { return new Map(); };
  window.Tactics.Radius.square = function() { return new Square(); };
}
