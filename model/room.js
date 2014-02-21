
var loadRoom = function(filename, success) {
    $.getJSON(filename).done(function(data) {

        var room = Room(data);

        // setup demo room

        // create the player and add
        room.entities.push(Player());

        // Create a random walk monster and add
        room.entities.push(RandomWalker());
        room.entities.push(RandomWalker());
        room.entities.push(RandomWalker());

        room.entities[3].palette = Palettes.MonsterBlue;

        //room.entities.push(Sword());

        success(room);

    }).fail(function(e1, e2, e3) {
        console.log( "error" );
    });
};


var Room = function(data) {
    var my = {};

    my.removeAfterFrame = [];

    my.tiles = data.tiles;

    // init tiles
    for (var i = my.tiles.length - 1; i > 0; i--) {
        my.tiles[i].rect = new Rect(my.tiles[i].x, my.tiles[i].y, 16, 16);
    }

    my.sprites = Sprites.outside;
    my.rect = new Rect(0, 0, 256, 176);

    my.entities = [];

    my.executeFrame = function(world) {

        // do room stuff


        // do entities
        for (var i = my.entities.length-1; i >= 0; i--) {
            my.entities[i].executeFrame(my);
        }

        // After frame stuff
        while (my.removeAfterFrame.length) {
            var entity = my.removeAfterFrame.pop();
            var a = [];
            for (var i = 0; i < my.entities.length; i++) {
                if (my.entities[i] != entity) {
                    a.push(my.entities[i]);
                }
            }

            my.entities = a;
        }


    };

    my.intersectsWall = function(rect) {
        var tile;
        for (var i = my.tiles.length - 1; i > 0; i--) {
            tile = my.tiles[i];
            if (tile.type == "wall") {
                if (tile.rect.intersects(rect)) return tile;
            }
        }

        return false;
    };

    return my;
};