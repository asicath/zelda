


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
            var toLeftGuide = mover.rect.x % my.guideSize;
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
            var toTopGuide = mover.rect.y % my.guideSize;
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
        var toLeftGuide = mover.rect.x % my.guideSize;
        return toLeftGuide == 0;
    };

    mover.isOnHorizontalGuide = function() {
        var toTopGuide = mover.rect.y % my.guideSize;
        return toTopGuide == 0;
    };

    my.onWallEvent = function(room, wall, rect) {
        my.stopShort(room, wall, my.moveIntent);
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

// Left over code to prevent all intersection on automove, with correct wall placement we shouldnt need this
/*
 var checkForAutoMove = function(moveIntent, guideSize) {

 // Check for auto correction
 if (moveIntent == Directions.top || moveIntent == Directions.bottom) {

 // check to make sure it is valid
 var rectLeft = new Rect(Math.round(my.rect.x - toLeftGuide), my.rect.y, my.rect.width, my.rect.height);
 var rectRight = new Rect(Math.round(my.rect.x + toRightGuide), my.rect.y, my.rect.width, my.rect.height);

 var intersectsLeft = room.intersectsWall(getFootPrint(rectLeft));
 var intersectsRight = room.intersectsWall(getFootPrint(rectRight));

 var goLeft = false;

 // determine if either direction is invalid
 if (intersectsLeft) {
 goLeft = false;
 }
 else if (intersectsRight) {
 goLeft = true;
 }
 else {
 // both are valid, favor lesser movement amount
 goLeft = toLeftGuide <= 4;
 }

 }
 else if (moveIntent == Directions.left || moveIntent == Directions.right) {

 var rectTop = new Rect(my.rect.x, Math.round(my.rect.y - toTopGuide), my.rect.width, my.rect.height);
 var rectBottom = new Rect(my.rect.x, Math.round(my.rect.y + toBottomGuide), my.rect.width, my.rect.height);

 var intersectsTop = room.intersectsWall(getFootPrint(rectTop));
 var intersectsBottom = room.intersectsWall(getFootPrint(rectBottom));

 var goTop = false;

 // determine if either direction is invalid
 if (intersectsTop) {
 goTop = false;
 }
 else if (intersectsBottom) {
 goTop = true;
 }
 else {
 // both are valid, favor lesser movement amount
 goTop = toTopGuide <= 4;
 }

 }
 };
 */