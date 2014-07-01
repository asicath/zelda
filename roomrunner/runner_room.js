var RunnerRoom = function(data) {
    var my = Room(data);

    var createPlayer = function(playerId) {
        var player = Player(playerId);

        my.players[playerId] = player;

        my.setPositionToOpenTile(player);
        player.monstersKilled = 0;
        my.addEntity(player);


    };

    my.players = [];





    var monsterCount = 0;
    var monsterKillCount = 0;


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

        // Check for edge events
        checkForTransition();

        checkAddMonster();


    };

    var checkAddMonster = function() {

        if (data.key == '09_07') {
            if (monsterCount < 1) {
                var boss = Aquamentus();
                boss.position.x = 170;
                boss.position.y = 32;
                my.addEntity(boss);
                monsterCount++;

                boss = Aquamentus();
                boss.position.x = 170;
                boss.position.y = 110;
                my.addEntity(boss);
                monsterCount++;

                Music.normal.pause();
                Music.boss.loop = true;
                Music.boss.play();
                Music.bossIntro.play();

                my.isBoss = true;
            }
        }
        else {
            // Plain old monster room
            if (monsterCount < 10) {
                addMonster();
                monsterCount++;
            }
        }



    };

    my.onMonsterKill = function(monster, sword) {
        monsterKillCount++;



        if (monsterKillCount == monsterCount) {
            // Cleared! add edges
            //my.addEntity(Edge(Directions.left));
            my.addEntity(Edge(Directions.right));
            //my.addEntity(Edge(Directions.top));
            //my.addEntity(Edge(Directions.bottom));

            if (my.isBoss) {
                Music.boss.pause();
                Sounds.fanfare.play();
            }

        }

        sword.player.monstersKilled++;
    };

    var addMonster = function() {

        // create the entity
        var e = Monster();
        if (Math.random() > 0.5) {
            e.life = 8;
        }

        // find a spot for it
        my.setPositionToOpenTile(e);

        // place it in a spawn cloud
        var spawn = SpawnCloud(e);
        my.addEntity(spawn);
    };


    my.transition = null;

    var checkForTransition = function() {
        if (my.transition) return;

        //mapTransitionToPlayerInput();
    };

    // Used as a placeholder until edge events
    var mapTransitionToPlayerInput = function() {

        for (var i = 0; i < playerInput.length; i++) {

            if (playerInput[i].up) {
                my.transition = Directions.top;
            }
            else if (playerInput[i].down) {
                my.transition = Directions.bottom;
            }
            else if (playerInput[i].left) {
                my.transition = Directions.left;
            }
            else if (playerInput[i].right) {
                my.transition = Directions.right;
            }

        }
    };

    return my;
};