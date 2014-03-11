var currentRoom;

var loadRoom = function(filename, success) {
    $.getJSON(filename).done(function(data) {

        currentRoom = Room(data);

        success(currentRoom);

    }).fail(function(e1, e2, e3) {
        console.log( "error" );
    });
};


var Room = function(data) {
    var my = {};

    var removeAfterFrame = [];
    var addAfterFrame = [];

    my.tiles = data.tiles;

    // init tiles
    for (var i = my.tiles.length - 1; i > 0; i--) {
        my.tiles[i].rect = new Rect(my.tiles[i].x, my.tiles[i].y, 16, 16);
    }

    my.sprites = Sprites.outside;
    my.rect = new Rect(0, 0, 256, 176);

    my.entities = [];
    my.players = [];

    my.createPlayer = function(playerId) {
        my.players[playerId] = Player(playerId);
        my.addEntity(my.players[playerId]);
    };

    my.executeFrame = function(world) {

        // player start
        if (!my.players[0] || my.players[0].isDead) {
            if (playerInput[0].start) {
                my.createPlayer(0);
            }
        }

        if (!my.players[1] || my.players[1].isDead) {
            if (playerInput[1].start) {
                my.createPlayer(1);
            }
        }

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

        checkAddMonster();

    };

    my.addEntity = function(entity) {
        addAfterFrame.push(entity);
    };

    my.removeEntity = function(entity) {
        removeAfterFrame.push(entity);
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
        //return;
        if (my.countToAddMonster >= 0) {
            if (my.countToAddMonster-- == 0) {

                // create the entity
                var e = Monster();
                if (Math.random() > 0.5) {
                    e.palette = Palettes.MonsterBlue;
                    e.life = 8;
                }
                if (--my.addCount > 0) {
                    my.countToAddMonster = 30;
                }

                // find a spot for it
                var tile = null;
                while (!tile) {
                    var i = Math.floor(Math.random() * my.tiles.length);
                    if (my.tiles[i].type == 'floor') tile = my.tiles[i];
                }
                e.rect = new Rect(tile.rect.x, tile.rect.y, e.rect.width, e.rect.height);


                // place it in a spawn cloud
                var spawn = SpawnCloud(e);
                my.addEntity(spawn);



            }
        }
    };


    return my;
};