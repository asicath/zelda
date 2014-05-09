var RunnerRoom = function(data) {
    var my = Room(data);

    var createPlayer = function(playerId) {
        my.players[playerId] = Player(playerId);

        my.setPositionToOpenTile(my.players[playerId]);

        my.addEntity(my.players[playerId]);
    };

    my.players = [];


    my.addEntity(Edge(Directions.left));
    my.addEntity(Edge(Directions.right));
    my.addEntity(Edge(Directions.top));
    my.addEntity(Edge(Directions.bottom));


    var monsterCount = 0;


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

        if (monsterCount < 10) {
            addMonster();
            monsterCount++;
        }
    };

    my.onMonsterKill = function(my, entity) {
        
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