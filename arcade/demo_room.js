

var DemoRoom = function(data) {
    var my = Room(data);

    /*

     //music.setPercent(0);
     //music.start();

    var musicPercent = 0.1;
    music.setPercent(musicPercent);


    var startMusicWhenReady = function() {
        if (music.isReadyToPlay()) {
            music.start();
            return;
        }
        setTimeout(startMusicWhenReady, 1000);
    };

    //startMusicWhenReady();
    */

    Music.eightBit.loop = true;
    //Music.eightBit.play();



    var createPlayer = function(playerId, playerInputIndex) {
        my.players[playerId] = Player(playerId, playerInputIndex);

        my.setPositionToOpenTile(my.players[playerId]);

        my.addEntity(my.players[playerId]);
    };

    my.players = [];
    var playerInputMap = {};

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function() {

        if (!crystal) {
            addCrystal();
        }

        // check for player creation
        for (var i = 0; i < playerInput.length; i++) {
            if (!playerInput[i]) continue;

            if (playerInput[i].start) {

                // determine playerId
                var playerId;
                var playerInputKey = i.toString();
                if (typeof playerInputMap[playerInputKey] === 'undefined') {
                    // give the controller a player id
                    playerInputMap[playerInputKey] = my.players.length;
                }
                playerId = playerInputMap[playerInputKey];

                // Allow start if possible
                if (!my.players[playerId] || my.players[playerId].isDead) {
                    createPlayer(playerId, i);
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

    my.onPlayerKill = function(player, killedBy) {
        //musicPercent = 0.1;
        //music.setPercent(musicPercent);
    };

    my.onMonsterKill = function(monster, player) {
        // Cause two more monsters to spawn
        //countToAddMonster = 30;
        //addCount += 2;

        // keep track of kills
        my.players[player.playerId].monstersKilled++;

        killCount++;

        if (killCount > 3) {
            crystal.setLevel(3);
        }
        else if (killCount > 2) {
            crystal.setLevel(2);
        }
        else if (killCount > 1) {
            crystal.setLevel(1);
        }

        //musicPercent += 0.02;
        //music.setPercent(musicPercent);
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
            monsterWave();
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

    var addMonster = function() {

        // create the entity
        var e;
        if (Math.random() > 0.5) {
            e = Monster(2);
        }
        else {
            e = Monster(1);
        }

        // find a spot for it
        my.setPositionToOpenTile(e);

        // place it in a spawn cloud
        var spawn = SpawnCloud(e);
        my.addEntity(spawn);
    };

    var crystal;
    var addCrystal = function() {
        crystal = Crystal();
        my.setPositionToOpenTile(crystal);
        my.addEntity(crystal);
    };



    return my;
};