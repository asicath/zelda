var DemoRoom = function(data) {
    var my = Room(data);

    var createPlayer = function(playerId) {
        my.players[playerId] = Player(playerId);

        my.setPositionToOpenTile(my.players[playerId]);

        my.addEntity(my.players[playerId]);
    };

    my.players = [];

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function() {

        // check for player creation
        for (var i = 0; i < playerInput.length; i++) {
            if (!my.players[i] || my.players[i].isDead) {
                if (playerInput[i].start) {
                    createPlayer(i);
                }
            }
        }


        executeFrame_parent();

        //checkAddMonster(30);
        checkWave();
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

        // Waiting to start next wave
        if (waveState == 0) {
            if (--my.framesToNextWave == 0) {
                // move to the next state
                waveState = 1;
                Sounds.fanfare.play();
                my.wave++;
            }
        }
        else {
            //if (my.wave % 1 == 1) {
                monsterWave();
            //}
            //else if (my.wave % 3 == 2) {
            //    aquamentusWave();
            //}
            //else {
            //    gohmaWave();
            //}
        }

    };

    var aquaCount = 1;

    var aquamentusWave = function() {

        if (waveState == 1) {

            var incr = 176 / (aquaCount + 1);

            for (var i = 0; i < aquaCount; i++) {
                var boss = Aquamentus();
                boss.position.x = 228;
                boss.position.y = incr * (i+1) - 16;
                currentRoom.addEntity(boss);
            }



            killCount = 0;

            waveState = 2;
        }

        if (waveState == 2) {
            if (killCount == aquaCount) {
                waveState = 0;
                my.framesToNextWave = 150;
                aquaCount++;
            }
        }

    };

    var gohmaCount = 1;

    var gohmaWave = function() {

        if (waveState == 1) {

            var incr = 256 / (gohmaCount + 1);

            for (var i = 0; i < gohmaCount; i++) {
                var boss = Gohma();
                boss.position.x = incr * (i+1) - 16;
                boss.position.y = 32;
                currentRoom.addEntity(boss);
            }



            killCount = 0;

            waveState = 2;
        }

        if (waveState == 2) {
            if (killCount == gohmaCount) {
                waveState = 0;
                my.framesToNextWave = 150;
                gohmaCount++;
            }
        }

    };

    var monsterWaveCount = 1;

    var monsterWave = function() {

        // Adding monsters
        if (waveState == 1) {
            // setup for the next state
            killCount = 0;
            monsterCount = Math.pow(2, monsterWaveCount);

            addCount = monsterCount;
            countToAddMonster = 10;

            waveState = 2;
        }

        if (waveState == 2) {
            if (addCount > 0) {
                checkAddMonster();
            }
            else {
                waveState = 3;
            }
        }

        // waiting for them all to be killed
        if (waveState == 3) {
            if (killCount == monsterCount) {
                waveState = 0;
                monsterWaveCount++;
                my.framesToNextWave = 150;
            }
        }
    };

    var checkAddMonster = function() {
        var wait = 10;
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
        my.setPositionToOpenTile(e);

        // place it in a spawn cloud
        var spawn = SpawnCloud(e);
        my.addEntity(spawn);
    };



    return my;
};