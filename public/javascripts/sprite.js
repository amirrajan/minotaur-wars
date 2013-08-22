Tactics.Minotaur = (function (image, c) {
    this.image = image;
    this.c = c;

    var border = 10;
    var spriteSize = 127;
    var spriteVerticalOffset = -55;
    var spriteHorizontalOffset = 15;

    this.draw = function (x, y, direction, isDead, isCrystal, step, attackStep) {


        var sheetColumn, sheetRow;

        switch (direction) {
            case 's':
                sheetColumn = 0;
                sheetRow = 3;
                break;
            case 'n':
                sheetColumn = 0;
                sheetRow = 7;
                break;
            case 'e':
                sheetColumn = 0;
                sheetRow = 5;
                break;
            case 'w':
                sheetColumn = 0;
                sheetRow = 1;
                break;
            default:
                sheetColumn = 0;
                sheetRow = 7;
                break;
        }

        sheetColumn += step;

        if (attackStep) {
            sheetColumn = 12 + attackStep;
        }

        if(isDead) {
          switch (direction) {
              case 's':
                  sheetColumn = 23;
                  sheetRow = 6;
                  break;
              case 'n':
                  sheetColumn = 23;
                  sheetRow = 7;
                  break;
              case 'e':
                  sheetColumn = 23;
                  sheetRow = 5;
                  break;
              case 'w':
                  sheetColumn = 23;
                  sheetRow = 4;
                  break;
              default:
                  sheetColumn = 23;
                  sheetRow = 7;
                  break;
          }
        }
        

        if(!isCrystal) {
          c.drawImage(Tactics.Assets.images.sprite_minotaur.source,
              (sheetColumn * spriteSize) + border,
              (sheetRow * spriteSize) + border,
              125,
              125,
              x + spriteHorizontalOffset,
              y + spriteVerticalOffset,
              125,
              125); 
        } else {
            c.drawImage(Tactics.Assets.images.crystal.source,
                0,
                0,
                25,
                50,
                x + 56,
                y + step + -16,
                25,
                50);
        }
    }
});

Tactics.DecorationSprite = (function (image, c, coordinates) {
    this.image = image;
    this.c = c;
    this.coordinates = coordinates;

    this.draw = function (x, y, type) {

        var xLocation, yLocation;

        var horizontalSpacer = 10;
        var verticalSpacer = 5;
        var spriteWidth = 140;
        var spriteHeight = 70;

        var height = 70;
        var width = 140;

        switch (type) {
            case 'movement':
                xLocation = 0;
                yLocation = 0;
                break;
            case 'mine':
                xLocation = 0;
                yLocation = 1;
                break;
            case 'selection':
                xLocation = 1;
                yLocation = 0;
                break;
            case 'crystal':
                //todo: change to a much darker red cell
                xLocation = 0;
                yLocation = 2;
                break;
            case 'attack':
                xLocation = 1;
                yLocation = 1;
                break;
            case 'currentlySelectedMine':
                xLocation = 2;
                yLocation = 0;
                break;
            default:
                alert('unsupported decoration sprite type: ' + type);
                break;
        }

        c.drawImage(Tactics.Assets.images.decorations.source,
            xLocation * (horizontalSpacer + spriteWidth),
            yLocation * (verticalSpacer + spriteHeight),
            width,
            height,
            Math.round(x),
            Math.round(y),
            Tactics.Assets.Sizes.tileWidth,
            Tactics.Assets.Sizes.tileHeight);

    };
});
