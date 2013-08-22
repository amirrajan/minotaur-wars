(function () {

    var Cell = function () { }
    var grid = [
        [
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: ['0,1'], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' }
        ],          
        [           
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' }
        ],    
        [     
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' }
        ],    
        [     
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: ['0,1'], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' }
        ],    
        [     
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' }
        ],    
        [     
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' }
        ],    
        [     
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' }
        ],    
        [     
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' }
        ],    
        [     
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' }
        ],    
        [     
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' },
            { obstacle: false, decorations: [], type: 'grass' }
        ],
    ];
    var size = 10;

    function otherUnitExistsAt(me, x, y) {
      return otherUnitAt(me, x, y) != null;
    }

    function otherUnitAt(me, x, y) {
      var other = null;
      Tactics.Data.Units.each(function(eachUnit) {
        var thisX = eachUnit.get("x");
        var thisY = eachUnit.get("y");
        if(thisX == me.x && thisY == me.y) {
          //do nothing (skip)
        } else if(thisX == x && thisY == y) {
          if(!eachUnit.get("isDead")) {
            other = eachUnit; //live unit found
          }
        }
      });

      return other;
    }
    
    var map = {

        grid: grid,
        showCoordinates: false,
        units: {},
        canvas: {},
        selectedCell: null,
        selectedUnit: null,
        step: 0,
        stepDirection: 'up',
        attackAnimationQueue: {},

        init: function (canvas, c, emitter) {
            map.canvas = canvas;
            map.c = c;
            map.emitter = emitter;
            canvas.addEventListener('mousedown', map.handleMouseDown, false);
        },

        update: function () {

            if (map.stepDirection === 'up') {
                map.step++;
            }
            else {
                map.step--;
            }

            if (map.step > 3) {
                map.step = 3;
                map.stepDirection = 'down';
            }
            if (map.step < 0) {
                map.step = 0;
                map.stepDirection = 'up';
            }

            for (var attackKey in map.attackAnimationQueue) {
                var attack = map.attackAnimationQueue[attackKey];
                attack.step = attack.step + 1;

                if (attack.step > 3)
                    delete map.attackAnimationQueue[attackKey];
            }

            var units = Tactics.Data.Units;
            if (!units || units.length === 0)
                return;

            units.each(function (unit) {
                var cooldown = unit.get('moveCooldown');
                var attackCooldown = unit.get('attackCooldown');
                var timeToCrystal = unit.get('timeToCrystal');
                var isDead = unit.get('isDead');
                var isCrystal = unit.get('isCrystal');

                if (isDead && !isCrystal) {
                    timeToCrystal -= 200;
                    unit.set('timeToCrystal', timeToCrystal);
                }
                if (cooldown > 0) {
                    cooldown -= 175;
                    unit.set('moveCooldown', cooldown);
                }
                if (attackCooldown > 0) {
                    attackCooldown -= 175;
                    unit.set('attackCooldown', attackCooldown);
                }
            });
        },

        draw: function () {

            if (!map.c) {
                return;
            }

            map.c.clearRect(0, 0, map.canvas.width, map.canvas.height);
            
            map.drawBackground();
            map.drawCells();
            map.drawSelectedCell();

            if (map.showCoordinates) {
                map.drawCoordinates(map.c);
            }
            map.drawUnits(map.c);
        },

        drawBackground: function () {
            map.c.drawImage(Tactics.Assets.images.big_background.source,
                0,
                0,
                1400,
                700);
        },

        drawCells: function () {

            var tileNumber = 1;
            for (var iRow = 0; iRow < grid.length; iRow++) {

                var row = grid[iRow];

                for (var iCell = 0; iCell < row.length; iCell++) {

                    var tilePositionX = (iRow - iCell) * Tactics.Assets.Sizes.tileHeight;
                    tilePositionX += (map.canvas.width / 2) - (Tactics.Assets.Sizes.tileWidth / 2);
                    var tilePositionY = (iRow + iCell) * (Tactics.Assets.Sizes.tileHeight / 2);

                    var cell = row[iCell];
                    cell.coordinates = {
                        row: iRow,
                        column: iCell
                    };
                    cell.x = tilePositionX;
                    cell.y = tilePositionY;
                    cell.centerX = tilePositionX + 70;
                    cell.centerY = tilePositionY + 30;

                    var image = null;
                    if (tileNumber === 1) {
                        image = Tactics.Assets.images.ground_1;
                    }
                    else if (tileNumber === 2) {
                        image = Tactics.Assets.images.ground_2;
                    }
                    else if (tileNumber === 3) {
                        image = Tactics.Assets.images.ground_3;
                    }
                    tileNumber++;
                    if (tileNumber === 4) {
                        tileNumber = 1;
                    }


                    map.c.drawImage(image.processedImage,
                        Math.round(tilePositionX),
                        Math.round(tilePositionY),
                        Tactics.Assets.Sizes.tileWidth,
                        Tactics.Assets.Sizes.tileHeight);

                    if (cell.decorations.length > 0) {
                        //map.drawDecorations(map.c, cell);


                    }
                }
            }
        },

        drawSelectedCell: function () {
            if (map.selectedCell) {

                var row = map.selectedCell.row,
                    column = map.selectedCell.column;

                var cell = map.grid[map.selectedCell.row][map.selectedCell.column];
                if (!map.selectedUnit) {
                    Tactics.Assets.sprites.decoration.draw(cell.x, cell.y, 'selection');
                    return;
                }

                var isUnitOfLoggedInUser = Tactics.client.username == map.selectedUnit.get('owner');
                var isDead = map.selectedUnit.get('isDead');
                if (isUnitOfLoggedInUser && !isDead) {
                    //==============================
                    //start draw movement squares
                    //==============================
                    var squareFinder = Tactics.Radius.squareFinder();
                    squareFinder.loc(row, column);

                    Tactics.Data.Units.each(function(eachUnit) {
                      var thisX = eachUnit.get("x");
                      var thisY = eachUnit.get("y");
                      if(thisX == row && thisY == column) {
                        //skip
                      } else {
                        if(!eachUnit.get("isCrystal")) {
                          squareFinder.hazard(eachUnit.get("x"), eachUnit.get("y"));
                        }
                      }
                    });

                    var moves = squareFinder.availableMoves();
                    for (var i = 0; i < moves.length; i++) {
                        var highlightCell = map.grid[moves[i].x][moves[i].y];
                        Tactics.Assets.sprites.decoration.draw(highlightCell.x, highlightCell.y, 'movement');
                    }
                    //==============================
                    //end movement squares
                    //==============================

                    //==============================
                    //start draw attack squares
                    //==============================
                    squareFinder = Tactics.Radius.squareFinder();
                    squareFinder.loc(row, column);
                    squareFinder.moveRadius = 1; //todo: attack radius, pull from unit type
                    moves = squareFinder.availableMoves();

                    for (var i = 0; i < moves.length; i++) {
                      if(otherUnitExistsAt({ x: row, y: column }, moves[i].x, moves[i].y)) {
                        var other = otherUnitAt({ x: row, y: column }, moves[i].x, moves[i].y);
                        if(!other.get("isDead") && other.get("owner") != Tactics.client.username) {
                          var highlightCell = map.grid[moves[i].x][moves[i].y];
                          Tactics.Assets.sprites.decoration.draw(highlightCell.x, highlightCell.y, 'attack');
                        }
                      }
                    }
                    //==============================
                    //end movement squares
                    //==============================
                }
                else {
                    Tactics.Assets.sprites.decoration.draw(cell.x, cell.y, 'selection');
                }
            }
        },

        drawDecorations: function (c, cell) {

            var height = 70;
            var width = 140;

            var horizontalSpacer = 10;
            var verticalSpacer = 5;
            var spriteWidth = 140;
            var spriteHeight = 70;

            for (var i = 0; i < cell.decorations.length; i++) {

                var coords = cell.decorations[i].split(',');

                c.drawImage(Tactics.Assets.images.decorations.source,
                    parseInt(coords[0]) * (horizontalSpacer + spriteWidth),
                    parseInt(coords[1]) * (verticalSpacer + spriteHeight),
                    140,
                    70,
                    Math.round(cell.x),
                    Math.round(cell.y),
                    width,
                    height);
            }
        },

        drawUnits: function () {
            var units = Tactics.Data.Units;
            if (!units || units.length === 0)
                return;

            units.each(function (unit) {
                var x = unit.get('x'), y = unit.get('y');
                var cell = map.grid[x][y];

                var isUnitOfLoggedInUser = Tactics.client.username == unit.get('owner');
                if (isUnitOfLoggedInUser) {

                    if (map.selectedUnit && x == map.selectedUnit.get('x') && y == map.selectedUnit.get('y')) {
                        Tactics.Assets.sprites.decoration.draw(cell.x, cell.y, 'currentlySelectedMine');
                    }
                    else {
                        Tactics.Assets.sprites.decoration.draw(cell.x, cell.y, 'mine');
                    }
                }
            });

            units.each(function (unit) {
                var x = unit.get('x'), y = unit.get('y');
                var cell = map.grid[x][y];

                var isUnitOfLoggedInUser = Tactics.client.username == unit.get('owner');
                var direction = unit.get('direction');
                var isDead = unit.get('isDead');
                var isCrystal = unit.get('isCrystal');

                var attack = map.attackAnimationQueue[cell.coordinates.row + '_' + cell.coordinates.column];
                if (attack) {
                    Tactics.Assets.sprites.minotaur.draw(cell.x, cell.y, direction, isDead, isCrystal, map.step, attack.step);
                }
                else {
                    Tactics.Assets.sprites.minotaur.draw(cell.x, cell.y, direction, isDead, isCrystal, map.step);

                }
                //==============================================================
                //==========================draw helpful stats =================
                //==============================================================
                if(!isCrystal) {
                  map.c.font = '18px Calibri';
                  map.c.fillStyle = 'white';
                  map.c.fillText(unit.get('hp'), cell.x + 105, cell.y + 50);
                  
                  var hitPointLevel = parseInt(unit.get('hp'));
                  if (hitPointLevel > 100) {
                      hitPointLevel = 100;
                  }

                  hitPointBarHeight = hitPointLevel / 2;


                  map.c.save();
                  map.c.fillStyle = '#0F0';
                  map.c.fillRect(cell.x + 105, cell.y + ((100 - hitPointLevel) / 2) - 15, 10, hitPointBarHeight);
                  map.c.strokeRect(cell.x + 105, cell.y - 15, 10, 50);
                  map.c.restore();

                  if (!isUnitOfLoggedInUser) {
                    map.c.fillText(unit.get('owner'), cell.x + 45, cell.y + 35);
                  }

                  var moveCooldown = unit.get('moveCooldown');
                  var attackCooldown = unit.get('attackCooldown');

                  map.c.font = '15px Calibri';
                  if(!isDead && isUnitOfLoggedInUser) {
                    if(moveCooldown > 0) {
                      var move_secs = moveCooldown / 1000.0;
                      var move_text = 'move ' + move_secs.toFixed(1);

                      map.c.fillText(move_text, cell.x + 45, cell.y + 35);
                    }
                    else  {
                      // map.c.fillText("move ready", cell.x + 40, cell.y + 35);
                    }

                    if(attackCooldown > 0) {
                      var attack_secs = attackCooldown / 1000.0;
                      var attack_text = 'attack ' + attack_secs.toFixed(1);

                      map.c.fillText(attack_text, cell.x + 45, cell.y + 50);
                    }
                    else {
                      // map.c.fillText("attack ready", cell.x + 40, cell.y + 50);
                    }
                  }
                }
            });
        },

        drawCoordinates: function () {
            map.c.save();
            map.c.fillStyle = '#444';
            map.c.strokeStyle = 'rgba(90, 90, 90, .02)';
            for (var iRow = 0; iRow < grid.length; iRow++) {
                var row = grid[iRow];

                for (var iCell = 0; iCell < row.length; iCell++) {
                    var cell = row[iCell];

                    map.c.fillText('x:' + iRow + ', y:' + iCell, cell.x + 60, cell.y + 35);

                    map.c.moveTo(cell.x, cell.y + 35);
                    map.c.lineTo(cell.x + 70, cell.y);
                    map.c.lineTo(cell.x + 140, cell.y + 35);
                    map.c.lineTo(cell.x + 70, cell.y + 70);
                    map.c.lineTo(cell.x, cell.y + 35);
                    map.c.stroke();
                }
            }
            map.c.restore();
        },

        handleMouseDown: function (e) {
            map.c.fillText(e.layerX + ',' + e.layerY, e.layerX, e.layerY);

            //I have no idea what's going on here. But it seems to work :)
            //http://www.dzone.com/snippets/point-inside-polygon
            var isPointInPoly = function(poly, pt) {
                for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
                    ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
                    && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
                    && (c = !c);
                return c;
            }

            for (var iRow = 0; iRow < map.grid.length; iRow++) {

                for (var iCell = 0; iCell < map.grid[iRow].length; iCell++) {
                    var cell = map.grid[iRow][iCell];

                    var hasClickedInCell = isPointInPoly([
                        { x: cell.x, y: cell.y + 35 },
                        { x: cell.x + 70, y: cell.y },
                        { x: cell.x + 140, y: cell.y + 35 },
                        { x: cell.x + 70, y: cell.y + 70 }
                    ],
                    {
                        x: e.layerX,
                        y: e.layerY
                    });

                    if (hasClickedInCell === true) {
                        var row = cell.coordinates.row,
                            column = cell.coordinates.column;
                        map.selectedCell = { row: row, column: column };

                        var lastSelectedUnit = map.selectedUnit;
                        if (map.selectedUnit) {
                            var isUnitOfLoggedInUser = Tactics.client.username == map.selectedUnit.get('owner');
                            var isDead = map.selectedUnit.get('isDead');
                            if (isUnitOfLoggedInUser && !isDead) {
                                var moveExecuted = false;
                                //================================
                                //begin move logic
                                //================================
                                var squareFinder = Tactics.Radius.squareFinder();
                                squareFinder.loc(map.selectedUnit.get('x'), map.selectedUnit.get('y'));
                                //================================
                                //add other units as hazards
                                //================================

                                Tactics.Data.Units.each(function(eachUnit) {
                                  var thisX = eachUnit.get("x");
                                  var thisY = eachUnit.get("y");
                                  if(thisX == map.selectedUnit.get('x') && thisY == map.selectedUnit.get('y')) {
                                    //skip
                                  } else {
                                    if(!eachUnit.get("isCrystal")) {
                                      squareFinder.hazard(eachUnit.get("x"), eachUnit.get("y"));
                                    }
                                  }
                                });

                                var moves = squareFinder.availableMoves();
                                for (var i = 0; i < moves.length; i++) {
                                    var move = moves[i];
                                    if (move.x == map.selectedCell.row && move.y == map.selectedCell.column) {
                                        if (map.selectedUnit.get('moveCooldown') > 0) {
                                          //todo: notify that they can't move
                                        }
                                        else {
                                            Tactics.client.move(map.selectedUnit.get('id'), move.x, move.y);
                                            moveExecuted = true;
                                            map.selectedCell = { row: row, column: column };
                                            break;
                                        }
                                    }
                                }
                                //================================
                                //end move logic
                                //================================
                                //
                                
                                //========================================
                                //begin attack logic
                                //=======================================
                                //other user exists at map.selectedCell.row && column
                                //and in range, then attack
                                if(!moveExecuted) {
                                  squareFinder = Tactics.Radius.squareFinder();
                                  squareFinder.loc(map.selectedUnit.get('x'), map.selectedUnit.get('y'));
                                  squareFinder.moveRadius = 1; //todo: attack radius, pull from unit type
                                  moves = squareFinder.availableMoves();

                                  var enemyExists = false;

                                  for (var i = 0; i < moves.length; i++) {
                                    if(otherUnitExistsAt({ x: map.selectedUnit.get('x'), y:  map.selectedUnit.get('y') }, moves[i].x, moves[i].y)) {
                                      var other = otherUnitAt({ x: map.selectedUnit.get('x'), y:  map.selectedUnit.get('y') }, moves[i].x, moves[i].y);
                                      if(!other.get("isDead") &&
                                          other.get("x") == map.selectedCell.row &&
                                          other.get("y") == map.selectedCell.column && 
                                          Tactics.client.username != other.get("owner")) {
                                        enemyExists = true;
                                      }
                                    }
                                  }

                                  if (enemyExists) {
                                      if (map.selectedUnit.get('attackCooldown') > 0) {
                                          //todo: notify that they can't attack
                                      }
                                      else {
                                          Tactics.client.attack(map.selectedUnit.get('id'), map.selectedCell.row, map.selectedCell.column);
                                      }
                                  }
                                }
                                //======================================
                                //end attack logic
                                //=====================================
                            }
                        }

                        //Set the new selected unit. May be the same as the last.

                        if(!isUnitOfLoggedInUser) {
                          map.selectedUnit = Tactics.Data.Units.find(function (unit) {
                              return unit.get('x') == row && unit.get('y') == column;
                          });
                        } else {
                          map.selectedUnit = null;
                        }

                        map.emitter.trigger('position-clicked', row, column);

                        return;
                    }
                }
            }
        }
    };
    
    Tactics.Map = map;
})();
