var RandomWalker = function() {

    var my = Walker();

    my.entityType = 'monster';

    my.rect = new Rect(128, 88, 16, 16);

    my.sprites = Sprites.octopus;
    my.spriteIndex = 0;
    my.palette = Palettes.MonsterRed;

    var linkStep = 0;
    var moving = null;

    //changeDirectionChance = 0.1f; // Once per second
    var changeDirectionChance = 0.1 / 2;
    var tickCountUntilRandom = 50;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        checkMove();

        if (my.hasVelocity()) {
            swapStep();
        }

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
            my.setMoving(moving);
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

    var setFacing_parent = my.setFacing;
    my.setFacing = function(direction) {
        setFacing_parent(direction);

        // change sprite
        switch (direction) {
            case Directions.top:
                my.spriteIndex = 0;
                break;
            case Directions.bottom:
                my.spriteIndex = 2;
                break;
            case Directions.left:
                my.spriteIndex = 4;
                break;
            case Directions.right:
                my.spriteIndex = 6;
                break;
        }
    };

    my.getSprite = function() {
        return my.sprites[my.spriteIndex + linkStep];
    };


    my.speed = 40/60; // can move 80 pixels in 1s or 60 frames

    var swapStepCount = 0;

    var swapStep = function() {
        if (swapStepCount++ % 8 == 0) {
            linkStep = linkStep > 0 ? 0 : 1;
        }
    };

    return my;
};

/*



protected void RandomWalker_EdgeEvent(Direction direction, Room room) {
    endMoving();
}

protected void RandomWalker_WallEvent(Wall wall) {
    endMoving();
}
*/