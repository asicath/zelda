
var loadRoom = function(filename, success) {
    $.getJSON(filename).done(function(data) {

        var room = Room(data);

        // setup demo room

        // create the player and add
        room.entities.push(Player(0));
        room.entities.push(Player(1, true));

        // Create a random walk monster and add
        //room.entities.push(Monster());
        //room.entities.push(Monster());
        //room.entities.push(Monster());

        //room.entities[3].palette = Palettes.MonsterBlue;

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

        checkAddMonster();

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

    my.getIntersectingEntities = function(entity) {
        var a = [];
        var e = null;
        var rect = null;

        for (var i = my.entities.length-1; i >= 0; i--) {

            e = my.entities[i];

            rect = e.getHitZone ? e.getHitZone(entity) : e.rect;

            if (rect.intersects(entity.rect)) {
                a.push(e);
            }

        }

        return a;
    };


    my.countToAddMonster = 0;
    my.addCount = 1;

    var checkAddMonster = function() {
        return;
        if (my.countToAddMonster >= 0) {
            if (my.countToAddMonster-- == 0) {
                var e = Monster();
                my.entities.push(e);

                if (Math.random() > 0.5) {
                    e.palette = Palettes.MonsterBlue;
                    e.life = 8;
                }

                if (--my.addCount > 0) {
                    my.countToAddMonster = 30;
                }
            }
        }
    };


    return my;
};