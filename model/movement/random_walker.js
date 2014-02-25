var RandomWalker = function(my) {
    my = Walker(my);

    var moving = null;

    //changeDirectionChance = 0.1f; // Once per second
    var changeDirectionChance = 0.1 / 2;
    var tickCountUntilRandom = 50;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

        // check for new random move
        checkMove();

        // Walker uses input
        executeFrame_parent(room);
    };

    var checkMove = function() {

        tickCountUntilRandom--;

        if (tickCountUntilRandom < 0 && Math.random() < changeDirectionChance) {
            //endMoving();
            moving = null;
        }

        if (moving == null) {
            moving = getRandomDirection();
            my.setWalkingDirection(moving);
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

    return my;
};
