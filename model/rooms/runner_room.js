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