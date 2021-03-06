define([
    'core/model/rooms/room',
    'core/model/entity/aquamentus',
    'core/model/entity/monster',
    'core/model/entity/spawn_cloud'
], function(
    Room,
    Aquamentus,
    Monster,
    SpawnCloud
) {

    var eightBit = new Audio("music/8 Bit legend.mp3");
    var musicVictory = new Audio("music/Victory1.mp3");
    var musicMiniBossIntro = new Audio("music/minibossintro.mp3");


    var BossWave = function (room) {
        var my = {};

        var addMonster = function () {

            // create the entity
            var e = Aquamentus();

            e.onDeath = onMonsterKill;

            // place it in a spawn cloud
            var spawn = SpawnCloud(e);

            // find a spot for it
            room.addEntityAtOpenTile(spawn);
        };

        var onMonsterKill = function (monster, entity) {

            // keep track of kills
            room.parent.players[entity.playerId].monstersKilled++;

            // only one monster
            my.onComplete();
        };

        // container will overwrite
        my.onComplete = function () {
        };

        // start adding monsters
        room.setFrameTimeout(60 * 5, addMonster);

        return my;
    };


    var MonsterWave = function (room, monsterCountMax) {
        var my = {};

        var monsterCount = 0;
        //var monsterCountMax = 10;

        var addMonsterCheck = function () {
            addMonster();
            monsterCount++;

            if (monsterCount < monsterCountMax) {
                room.setFrameTimeout(30, addMonsterCheck);
            }

        };

        // start adding monsters
        room.setFrameTimeout(60 * 2, addMonsterCheck);

        var killCount = 0;

        var addMonster = function () {

            // create the entity
            var e;
            if (Math.random() > 0.5) {
                e = Monster(2);
            }
            else {
                e = Monster(1);
            }

            e.onDeath = onMonsterKill;

            // place it in a spawn cloud
            var spawn = SpawnCloud(e);

            // find a spot for it
            room.addEntityAtOpenTile(spawn);
        };

        var onMonsterKill = function (monster, entity) {

            // keep track of kills
            room.parent.players[entity.playerId].monstersKilled++;

            // keep track of total room kills
            killCount++;

            // when all the monsters are dead, room is complete
            if (monsterCount == monsterCountMax && killCount == monsterCount) {

                my.onComplete();
            }

        };

        // container will overwrite
        my.onComplete = function () {
        };

        return my;
    };


    return function (data) {

        var my = Room(data);

        eightBit.loop = true;
        eightBit.play();

        var waveCount = 0;

        var nextWave = function () {
            waveCount++;


            // First two waves just start a new monster wave
            if (waveCount <= 3) {
                var wave = MonsterWave(my, 10 * waveCount);
                my.title = "wave " + waveCount;
                wave.onComplete = nextWave;
            }
            else if (waveCount == 4) {
                // aquamentus
                var wave = BossWave(my);

                musicMiniBossIntro.play();
                musicMiniBossIntro.addEventListener('ended', function () {
                    musicMiniBossIntro.load();
                });

                my.title = "boss";
                wave.onComplete = nextWave;
            }
            else {

                // stop the music
                eightBit.pause();
                eightBit.load();

                musicMiniBossIntro.pause();
                musicMiniBossIntro.load();

                my.setFrameTimeout(30, function () {
                    musicVictory.play();

                    musicVictory.addEventListener('ended', function () {
                        musicVictory.load();
                        my.setFrameTimeout(30, my.onComplete);
                    });
                });


            }
        };

        my.setFrameTimeout(60 * 2, nextWave);

        // container will overwrite
        my.onComplete = function () {
        };





        return my;
    };

});