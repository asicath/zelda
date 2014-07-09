


var Room = function(data) {
    var my = {};

    FrameEventHaver(my);

    var removeAfterFrame = [];
    var addAfterFrame = [];

    var walls = [];
    my.rect = new Rect(new Position(0,0), 256, 176, 0, 0);
    my.entities = [];

    // Load from tiles if present
    if (data.tiles) {
        my.tiles = data.tiles;

        var outsideGreen = null;
        var outsideBrown = ImageOptions('brown').addColorSwap("1A", "17");
        var outsideGrey = ImageOptions('grey').addColorSwap("1A", "20").addColorSwap("37", "00");

        var imageOptions = [
            outsideGreen,
            outsideBrown,
            outsideGrey
        ];

        // init tiles
        for (var i = my.tiles.length - 1; i >= 0; i--) {
            var tile = my.tiles[i];
            tile.position = new Position(tile.x, tile.y);
            tile.rect = new Rect(tile.position, 16, 16, 0, 0);


            tile.sprite = SpriteSheets.outside.sprites[tile.index];
            tile.imageOptions = imageOptions[tile.palette];
        }

        // init walls from tiles
        for (var i = my.tiles.length - 1; i >= 0; i--) {
            var tile = my.tiles[i];
            if (tile.type == 'wall') {
                walls.push({ rect: new Rect(new Position(tile.position.x, tile.position.y), 8, 8, 0, 0) });
                walls.push({ rect: new Rect(new Position(tile.position.x + 8, tile.position.y), 8, 8, 0, 0) });
                walls.push({ rect: new Rect(new Position(tile.position.x, tile.position.y + 8), 8, 8, 0, 0) });
                if (tile.index !=24)
                walls.push({ rect: new Rect(new Position(tile.position.x + 8, tile.position.y + 8), 8, 8, 0, 0) });
            }
        }

    }

    if (data.overlay) {
        my.backgroundSprite = data.overlay.sprite;
        my.tiles = [];
        my.tiles[0] = {x:256/2, y:176/2, type:'floor'};
        my.tiles[0].position = new Position(my.tiles[0].x, my.tiles[0].y);
        my.tiles[0].rect = new Rect(my.tiles[0].position, 16, 16, 0, 0);

        // init walls
        var overlay = data.overlay.overlay[0];
        for (var x = 0; x < 256; x+=8) {
            for (var y = 0; y < 176; y+=8) {
                var p = overlay.getPixel(x, y);
                if (p.color.a > 0) {
                    walls.push({ rect: new Rect(new Position(x, y), 8, 8, 0, 0) });
                }
            }
        }
    }



    my.executeFrame = function() {

        my.processEventQueue(my);

        // do entities
        for (var i = my.entities.length-1; i >= 0; i--) {
            my.entities[i].executeFrame(my);
        }

        // After frame stuff
        while (removeAfterFrame.length) {
            var entity = removeAfterFrame.pop();
            var a = [];
            for (var i = 0; i < my.entities.length; i++) {
                if (my.entities[i] != entity) {
                    a.push(my.entities[i]);
                }
            }

            my.entities = a;
        }

        while (addAfterFrame.length) {
            var entity = addAfterFrame.pop();
            my.entities.push(entity);
        }


    };

    my.onPlayerKill = function() {};
    my.onMonsterKill = function() {};

    my.addEntityAtOpenTile = function(entity) {
        var tile = null;
        while (!tile) {
            var i = Math.floor(Math.random() * my.tiles.length);
            if (my.tiles[i].type == 'floor') tile = my.tiles[i];
        }
        entity.position.copy(tile.position);

        my.addEntity(entity);
    };

    my.addEntity = function(entity) {
        addAfterFrame.push(entity);
    };

    my.removeEntity = function(entity) {
        removeAfterFrame.push(entity);
    };

    my.intersectsWall = function(rect) {
        for (var i = walls.length - 1; i >= 0; i--) {
            if (walls[i].rect.intersects(rect)) return walls[i];
        }
        return false;
    };

    my.getIntersectingEntities = function(entity, targetEntityType, footPrintType) {
        var a = null;
        var e = null;
        var rect = entity.getFootPrint();

        for (var i = my.entities.length-1; i >= 0; i--) {

            e = my.entities[i];

            // Only check certain types, eventually split into different arrays for speed
            if (e.entityType == targetEntityType) {

                var targetRect = e.getFootPrint(footPrintType);

                // check for intersection
                if (targetRect.intersects(rect)) {
                    if (a == null) a = [];
                    a.push(e);
                }

            }

        }

        return a;
    };




    return my;
};