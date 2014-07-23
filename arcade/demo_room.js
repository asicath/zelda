

var DemoRoom = function(data) {
    var my = PlayerRoom(data);

    //Music.eightBit.loop = true;
    //Music.eightBit.play();

    var wave = Wave(my);

    wave.onComplete = function() {
        // start adding monsters
        my.setFrameTimeout(60*2, my.onComplete);
    };

    // should be added onto each monster?
    my.onMonsterKill = function(monster, player) {
        wave.onMonsterKill(monster, player);
    };

    // container will overwrite
    my.onComplete = function() {};

    return my;
};




var Wave = function(room) {
    var my = {};

    var monsterCount = 0;
    var monsterCountMax = 10;

    var addMonsterCheck = function() {
        addMonster();
        monsterCount++;

        if (monsterCount < monsterCountMax) {
            room.setFrameTimeout(30, addMonsterCheck);
        }

    };

    // start adding monsters
    room.setFrameTimeout(60*2, addMonsterCheck);

    var killCount = 0;

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
        room.addEntityAtOpenTile(spawn);
    };

    my.onMonsterKill = function(monster, player) {

        // keep track of kills
        room.players[player.playerId].monstersKilled++;

        // keep track of total room kills
        killCount++;

        // when all the monsters are dead, room is complete
        if (monsterCount == monsterCountMax && killCount == monsterCount) {
            my.onComplete();
        }

    };

    // container will overwrite
    my.onComplete = function() {};

    return my;
};