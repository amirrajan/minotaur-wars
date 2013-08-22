var Radius = require('../public/javascripts/radius.js');

describe('move area', function() {
  it('up and right', function() {
    var squareFinder = Radius.squareFinder();
    squareFinder.loc(0, 0);

    var square = squareFinder.map.squares[0];

    expect(square.x).toBe(0);
    expect(square.y).toBe(0);

    var rightSquare = square.right();
    expect(rightSquare.x).toBe(1);
    expect(rightSquare.y).toBe(0);

    var upSquare = square.up();
    expect(upSquare.x).toBe(0);
    expect(upSquare.y).toBe(1);
  });
});
