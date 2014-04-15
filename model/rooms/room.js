


var Room = function(data) {
    var my = {};

    var removeAfterFrame = [];
    var addAfterFrame = [];

    my.tiles = data.tiles;

    // init tiles
    for (var i = my.tiles.length - 1; i >= 0; i--) {
        my.tiles[i].position = new Position(my.tiles[i].x, my.tiles[i].y);
        my.tiles[i].rect = new Rect(my.tiles[i].position, 16, 16, 0, 0);
    }

    my.sprites = Sprites.outside;
    my.rect = new Rect(new Position(0,0), 256, 176, 0, 0);

    my.entities = [];


    my.executeFrame = function(world) {

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

    my.addEntity = function(entity) {
        addAfterFrame.push(entity);
    };

    my.removeEntity = function(entity) {
        removeAfterFrame.push(entity);
    };

    my.intersectsWall = function(rect) {
        var tile;
        for (var i = my.tiles.length - 1; i >= 0; i--) {
            tile = my.tiles[i];
            if (tile.type == "wall") {
                if (tile.rect.intersects(rect)) return tile;
            }
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