


var Walk = function(mover) {
    var my = MovementSource(mover);

    my.moveIntent = null;

    // Returns true if this source moved this frame
    my.executeMove = function(room) {

        if (!my.moveIntent) return false;

        var amount = mover.speed;


        my.attemptSimpleMove(room, my.moveIntent, amount);

        swapStep();

        return true;
    };

    my.onWallEvent = function(room, wall, rect) {
        my.stopShort(room, wall, my.moveIntent);
    };

    my.onEdgeEvent = function(room, wall, rect) {

    };

    // The walker will have four faces of movement
    mover.setFacing = function(direction) {

        //my.facing = direction;

        // change sprite
        switch (direction) {
            case Directions.top:
                mover.spriteIndex = mover.facingSpriteBaseIndex[0];
                break;
            case Directions.bottom:
                mover.spriteIndex = mover.facingSpriteBaseIndex[1];
                break;
            case Directions.left:
                mover.spriteIndex = mover.facingSpriteBaseIndex[2];
                break;
            case Directions.right:
                mover.spriteIndex = mover.facingSpriteBaseIndex[3];
                break;
        }
    };

    // Over write the sprite getter, maybe not do this in the future?
    var step = 0;
    var swapStepCount = 0;
    my.stepChange = 6;

    mover.getSprite = function() {
        return mover.sprites[mover.spriteIndex + step];
    };

    my.resetStep = function() {
        swapStepCount = 0;
        step = 0;
    };

    var swapStep = function() {
        if (swapStepCount++ % my.stepChange == 0) {
            step = step > 0 ? 0 : 1;
        }
    };

    return my;
};
