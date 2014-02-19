
var loadRoom = function(filename, success) {
    $.getJSON(filename).done(function(data) {

        var room = Room(data);
        success(room);

    }).fail(function(e1, e2, e3) {
        console.log( "error" );
    });
};


var Room = function(data) {
    var my = {};

    my.tiles = data.tiles;
    my.entities = [];

    my.playerEntity = PlayerEntity();
    my.entities.push(my.playerEntity);

    my.sprites = Sprites.outside;

    my.rect = Rect(0, 0, 256, 176);

    my.executeFrame = function(world) {

        // do room stuff

        // do entities
        for (var i = my.entities.length-1; i >= 0; i--) {
            my.entities[i].executeFrame(my);
        }

    };

    my.intersectsWall = function(rect) {
        var tile, xDiff, yDiff, intersects;
        for (var i = my.tiles.length - 1; i > 0; i--) {
            tile = my.tiles[i];
            if (tile.type == "wall") {

                intersects = !( tile.x >= rect.x + rect.width || tile.x + 16 <= rect.x || tile.y >= rect.y + rect.height || tile.y + 16 <= rect.y );

                if (intersects) return tile;
            }
        }

        return false;
    };

    var intersectRect = function(r1, r2) {
        return !(r2.left > r1.right ||
            r2.right < r1.left ||
            r2.top > r1.bottom ||
            r2.bottom < r1.top);
    };

    return my;
};