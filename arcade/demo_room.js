

var DemoRoom = function(data) {
    var my = PlayerRoom(data);

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




    // *** Crystals ***
    var crystal;
    var addCrystal = function() {
        crystal = Crystal();
        my.addEntityAtOpenTile(crystal);
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

    //addCrystal();

    var killCount = 0;

    my.onMonsterKill = function(monster, player) {

        // keep track of kills
        my.players[player.playerId].monstersKilled++;

        // keep track of total room kills
        killCount++;

        // when all the monsters are dead, room is complete
        if (monsterCount == monsterCountMax && killCount == monsterCount) {
            // start adding monsters
            my.setFrameTimeout(60*2, my.onComplete);
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

    return my;
};