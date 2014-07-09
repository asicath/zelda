

var DemoRoom = function(data) {
    var my = Room(data);

    my.wave = 0;

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

    //Music.eightBit.loop = true;
    //Music.eightBit.play();


    // *** Players ***
    my.players = [];
    var playerInputMap = {};
    var createPlayer = function(playerId, playerInputIndex) {
        my.players[playerId] = Player(playerId, playerInputIndex);
        my.addEntityAtOpenTile(my.players[playerId]);
    };

    var checkForPlayerAdd = function() {
        // check for player creation
        for (var i = 0; i < playerInput.length; i++) {
            if (!playerInput[i]) continue;

            if (playerInput[i].start) {

                var playerId = playerInput[i].playerId;

                // create playerId
                if (typeof playerId === 'undefined') {
                    var max = -1;
                    for (var j = 0; j < playerInput.length; j++) {
                        if (playerInput[j] && typeof playerInput[j].playerId !== 'undefined')
                            max = playerInput[j].playerId > max ? playerInput[j].playerId : max;
                    }
                    playerId = max+1;
                    playerInput[i].playerId = playerId;
                }

                // Allow start if possible
                if (!my.players[playerId] || my.players[playerId].isDead) {
                    createPlayer(playerId, i);
                }
            }
        }
    };


    // *** Crystals ***
    var crystal;
    var addCrystal = function() {
        crystal = Crystal();
        my.addEntityAtOpenTile(crystal);
    };



    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function() {

        if (!crystal) {
            addCrystal();
        }

        checkForPlayerAdd();

        executeFrame_parent();
    };


    var monsterCount = 0;
    var monsterCountMax = 10;

    var addMonsterCheck = function() {
        addMonster();
        monsterCount++;

        if (monsterCount < monsterCountMax) {
            my.setFrameTimeout(30, addMonsterCheck);
        }

    };

    // start adding monsters
    my.setFrameTimeout(60*2, addMonsterCheck);



    var killCount = 0;

    my.onMonsterKill = function(monster, player) {

        // keep track of kills
        my.players[player.playerId].monstersKilled++;

        // keep track of total room kills
        killCount++;

        // when all the monsters are dead, room is complete
        if (monsterCount == monsterCountMax && killCount == monsterCount) {
            my.onComplete();
        }

        /*
        if (killCount > 3) {
            crystal.setLevel(3);
        }
        else if (killCount > 2) {
            crystal.setLevel(2);
        }
        else if (killCount > 1) {
            crystal.setLevel(1);
        }
        */
    };

    my.onComplete = function() {

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



        // place it in a spawn cloud
        var spawn = SpawnCloud(e);

        // find a spot for it
        my.addEntityAtOpenTile(spawn);
    };



    /*

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


    var countToAddMonster = 0;
    var addCount = 0;
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


    */





    return my;
};