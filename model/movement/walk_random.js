var WalkRandom = function(mover) {
    var my = Walk(mover);

    var moving = null;

    //changeDirectionChance = 0.1f; // Once per second
    var changeDirectionChance = 0.1 / 2;
    var tickCountUntilRandom = 50;

    var executeMove_parent = my.executeMove;
    my.executeMove = function(room) {
        // check for new random move
        checkMove();
        executeMove_parent(room);
    };

    var checkMove = function() {

        tickCountUntilRandom--;

        if (tickCountUntilRandom < 0 && Math.random() < changeDirectionChance) {
            //endMoving();
            moving = null;
        }

        if (moving == null) {
            moving = getRandomDirection();
            my.moveIntent = moving;
            tickCountUntilRandom = 50;
        }
    };

    var getRandomSpeed = function(min, max) {
        return Math.random() * (max - min) + min;
    };

    var getRandomDirection = function() {
        var i = Math.floor(Math.random() * 4);
        switch (i) {
            case 0: return Directions.top;
            case 1: return Directions.bottom;
            case 2: return Directions.left;
            case 3: return Directions.right;
        }
        return Directions.top;
    };

    var onWallEvent_parent = my.onWallEvent;
    my.onWallEvent = function(room, wall, rect) {
        onWallEvent_parent(room, wall, rect);
        moving = null;
    };

    var onEdgeEvent_parent = my.onEdgeEvent;
    my.onEdgeEvent = function(room, wall, rect) {
        onEdgeEvent_parent(room, wall, rect);
        moving = null;
    };

    return my;
};