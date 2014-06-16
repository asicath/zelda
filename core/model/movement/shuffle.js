
var Shuffle = function(mover) {
    var my = MovementSource(mover);

    mover.canWalk = true;

    var speed = 0.1;
    var info = {
        moving: null,
        frameUntilCheck: 0
    };

    mover.shuffleDirection = [null, Directions.left, Directions.top, Directions.right, Directions.bottom];

    // Returns true if this source moved this frame
    my.executeMove = function(room) {

        if (!mover.canWalk) return false;

        if (--info.frameUntilCheck < 0) {
            if (Math.random() < 0.25) {
                var p = Math.floor(Math.random() * 5);
                info.moving = mover.shuffleDirection[p];
            }
            else {
                // keep doing what you are doing
            }

            info.frameUntilCheck = 60;
        }

        if (info.moving) {
            // push does not change facing
            my.attemptSimpleMove(room, info.moving, 0.1, null);

        }

        swapStep();

        return true;
    };

    my.onEdgeEvent = function(room, wall, rect) {
        //endPush();
    };

    // Over write the sprite getter, maybe not do this in the future?
    var step = 0;
    var swapStepCount = 0;
    my.stepChange = 30;

    mover.icon.getSprite = function() {
        return mover.icon.sprites[mover.icon.spriteIndex + step];
    };

    // Allow others to reset the step count
    mover.resetStep = function() {
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