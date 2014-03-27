var currentRoom;

var loadRoom = function(filename, success) {
    $.getJSON(filename).done(function(data) {

        currentRoom = Room(data);

        var boss = Aquamentus();
        boss.position.x = 220;
        boss.position.y = 72;
        currentRoom.addEntity(boss);

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
    for (var i = my.tiles.length - 1; i >= 0; i--) {
        my.tiles[i].position = new Position(my.tiles[i].x, my.tiles[i].y);
        my.tiles[i].rect = new Rect(my.tiles[i].position, 16, 16, 0, 0);
    }

    my.sprites = Sprites.outside;
    my.rect = new Rect(new Position(0,0), 256, 176, 0, 0);

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

        //checkAddMonster(30);
        checkWave();
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


    var countToAddMonster = 0;
    var addCount = 0;

    var killCount = 0;
    var monsterCount = 0;

    my.wave = 0;
    var waveState = 0;
    my.framesToNextWave = 150;

    my.onMonsterKill = function(monster, player) {
        // Cause two more monsters to spawn
        //countToAddMonster = 30;
        //addCount += 2;

        // keep track of kills
        my.players[player.playerId].monstersKilled++;

        killCount++;
    };

    var checkWave = function() {
        //addFly();
        // Waiting to start next wave
        if (waveState == 0) {
            if (--my.framesToNextWave == 0) {

                // move to the next state
                waveState = 1;
                sound_fanfare.play();
                my.wave++;

                // setup for the next state
                killCount = 0;
                monsterCount = Math.pow(2, my.wave);
                addCount = monsterCount;
                countToAddMonster = 10;
            }
        }

        // Adding monsters
        if (waveState == 1) {
            if (addCount > 0) {
                checkAddMonster(10);
            }
            else {
                waveState = 2;
            }
        }

        // waiting for them all to be killed
        if (waveState == 2) {
            if (killCount == monsterCount) {
                waveState = 0;
                my.framesToNextWave = 150;
            }
        }

    };

    var checkAddMonster = function(wait) {

        if (countToAddMonster >= 0) {

            var added = monsterCount - addCount;
            var inRoom = added - killCount;
            if (inRoom >= 50) return;

            if (countToAddMonster-- == 0) {
                addMonster();

                if (--addCount > 0) {
                    countToAddMonster = wait;
                }
            }

        }

    };

    var addFly = function() {
        var e = Fly();
        // find a spot for it
        var tile = null;
        while (!tile) {
            var i = Math.floor(Math.random() * my.tiles.length);
            if (my.tiles[i].type == 'floor') tile = my.tiles[i];
        }

        e.position.copy(tile.position);

        my.addEntity(e);
    };

    var addMonster = function() {

        // create the entity
        var e = Monster();
        if (Math.random() > 0.5) {
            e.icon.palette = Palettes.MonsterBlue;
            e.life = 8;
        }

        // find a spot for it
        var tile = null;
        while (!tile) {
            var i = Math.floor(Math.random() * my.tiles.length);
            if (my.tiles[i].type == 'floor') tile = my.tiles[i];
        }

        e.position.copy(tile.position);


        // place it in a spawn cloud
        var spawn = SpawnCloud(e);
        my.addEntity(spawn);
    };


    return my;
};