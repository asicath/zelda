


var Walk = function(mover) {
    var my = MovementSource(mover);

    my.moveIntent = null;

    mover.canWalk = true;
    mover.canChangeFace = true;

    mover.isWalker = true;
    mover.lastWalkDirection = Directions.bottom;

    my.guideSize = 8;

    // Returns true if this source moved this frame
    my.executeMove = function(room) {

        if (!my.moveIntent) return false;

        if (!mover.canWalk) {

            if (mover.canChangeFace) {
                // can't walk, but make sure to update facing
                mover.setFacing(my.moveIntent);
            }

            return false;
        }

        var amount = mover.speed;

        // Make sure that we are on a guide
        amount = moveToGuide(room, amount);

        // Use any left over movement to move in the intended direction
        if (amount > 0) {
            mover.lastWalkDirection = my.moveIntent;
            my.attemptSimpleMove(room, my.moveIntent, amount, my.moveIntent);
        }

        swapStep();

        return true;
    };

    // Will return amount left over
    var moveToGuide = function(room, amount) {

        var toGuideAmount = 0;
        var direction = null;

        // make sure we're on a guide
        if (my.moveIntent == Directions.top || my.moveIntent == Directions.bottom) {
            var toLeftGuide = mover.position.x % my.guideSize;
            if (toLeftGuide > 0) {
                var toRightGuide = my.guideSize - toLeftGuide;
                if (toLeftGuide <= toRightGuide) {
                    direction = Directions.left;
                    toGuideAmount = toLeftGuide;
                }
                else {
                    direction = Directions.right;
                    toGuideAmount = toRightGuide;
                }
            }
        }
        else if (my.moveIntent == Directions.left || my.moveIntent == Directions.right) {
            var toTopGuide = mover.position.y % my.guideSize;
            if (toTopGuide > 0) {
                var toBottomGuide = my.guideSize - toTopGuide;
                if (toTopGuide <= toBottomGuide) {
                    direction = Directions.top;
                    toGuideAmount = toTopGuide;
                }
                else {
                    direction = Directions.bottom;
                    toGuideAmount = toBottomGuide;
                }
            }
        }

        // no guide move needed, give back the full amount
        if (!direction) {return amount;}

        // Limit the amount moved
        if (toGuideAmount > amount) {
            toGuideAmount = amount;
        }

        // Take the move
        mover.lastWalkDirection = direction;
        my.attemptSimpleMove(room, direction, toGuideAmount, direction);

        // give back whatever is left
        return amount - toGuideAmount;
    };

    mover.isOnVerticalGuide = function() {
        var toLeftGuide = mover.position.x % my.guideSize;
        return toLeftGuide == 0;
    };

    mover.isOnHorizontalGuide = function() {
        var toTopGuide = mover.position.y % my.guideSize;
        return toTopGuide == 0;
    };

    my.onWallEvent = function(room, wall, rect) {
        my.stopShort(room, wall.rect, my.moveIntent);
    };

    my.onEdgeEvent = function(room, wall, rect) {

    };

    // The walker will have four faces of movement
    var setFacing_parent = mover.setFacing;
    mover.setFacing = function(direction) {

        setFacing_parent(direction);

        // change sprite
        switch (direction) {
            case Directions.top:
                mover.icon.spriteIndex = mover.facingSpriteBaseIndex[0];
                break;
            case Directions.bottom:
                mover.icon.spriteIndex = mover.facingSpriteBaseIndex[1];
                break;
            case Directions.left:
                mover.icon.spriteIndex = mover.facingSpriteBaseIndex[2];
                break;
            case Directions.right:
                mover.icon.spriteIndex = mover.facingSpriteBaseIndex[3];
                break;
        }
    };

    // Over write the sprite getter, maybe not do this in the future?
    var step = 0;
    var swapStepCount = 0;
    my.stepChange = 6;

    mover.icon.getSprite = function() {
        return mover.icon.spriteSheet.sprites[mover.icon.spriteIndex + step];
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
