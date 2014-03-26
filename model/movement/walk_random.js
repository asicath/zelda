var WalkRandom = function(mover) {
    var my = Walk(mover);

    var moving = null;

    mover.changeDirectionPercent = 4/16;
    mover.homingPercent = 64/255;

    var framesUntilNextMove = 0;

    var executeMove_parent = my.executeMove;
    my.executeMove = function(room) {
        // check for new random move
        checkMove(room);
        executeMove_parent(room);
    };

    var checkMove = function(room) {

        framesUntilNextMove--;

        if (framesUntilNextMove > 0) return;

        if (Math.random() < mover.changeDirectionPercent) {
            moving = null;
        }

        if (moving == null) {
            moving = getRandomDirection();
            my.moveIntent = moving;
        }

        framesUntilNextMove = Math.floor(mover.getFootPrint().width / mover.speed);
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
        framesUntilNextMove = 0;
        moving = null;
    };

    var onEdgeEvent_parent = my.onEdgeEvent;
    my.onEdgeEvent = function(room, wall, rect) {
        onEdgeEvent_parent(room, wall, rect);
        framesUntilNextMove = 0;
        moving = null;
    };

    return my;
};