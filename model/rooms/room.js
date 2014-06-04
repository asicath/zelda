


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

        // init tiles
        for (var i = my.tiles.length - 1; i >= 0; i--) {
            my.tiles[i].position = new Position(my.tiles[i].x, my.tiles[i].y);
            my.tiles[i].rect = new Rect(my.tiles[i].position, 16, 16, 0, 0);
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

        my.sprites = Sprites.outside;
    }

    if (data.overlay) {
        my.backgroundSprite = data.overlay.sprite;
        my.tiles = [];
        my.tiles[0] = {x:0, y:0, type:'floor'};
        my.tiles[0].position = new Position(my.tiles[0].x, my.tiles[0].y);
        my.tiles[0].rect = new Rect(my.tiles[0].position, 16, 16, 0, 0);
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

    my.setPositionToOpenTile = function(entity) {
        var tile = null;
        while (!tile) {
            var i = Math.floor(Math.random() * my.tiles.length);
            if (my.tiles[i].type == 'floor') tile = my.tiles[i];
        }
        entity.position.copy(tile.position);
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