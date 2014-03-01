
var Push = function(mover) {
    var my = MovementSource(mover);

    var info = null;

    // give the mover a push function
    mover.push = function(direction, distance, velocity) {
        info = {
            direction: direction,
            distance: distance,
            velocity: velocity,
            complete: false
        }
    };

    // Will always be pushed, but only aligned to the last walk direction
    mover.pushFromContact = function(rect) {

        var pushDirection;

        if (!mover.isWalker) {
            // Don't move?
        }
        else if (mover.lastWalkDirection == Directions.top || mover.lastWalkDirection == Directions.bottom) {
            if (rect.y > mover.rect.y) {
                pushDirection = Directions.top;
            }
            else {
                pushDirection = Directions.bottom;
            }
        }
        else if (mover.lastWalkDirection == Directions.left || mover.lastWalkDirection == Directions.right) {
            if (rect.x > mover.rect.x) {
                pushDirection = Directions.left;
            }
            else {
                pushDirection = Directions.right;
            }
        }

        if (pushDirection) {
            // slide 32 pixels in 46 frames
            mover.push(pushDirection, 32, 32/8);
        }

    };

    // will not be pushed unless thrustDirection aligns with the guide the walker is on
    mover.pushFromThrust = function(thrustDirection) {

        var pushDirection;

        if (!mover.isWalker) {
            // No need for guides
            pushDirection = thrustDirection;
        }
        else if (thrustDirection == Directions.top || thrustDirection == Directions.bottom) {
            if (mover.isOnVerticalGuide()) pushDirection = thrustDirection;
        }
        else {
            if (mover.isOnHorizontalGuide()) pushDirection = thrustDirection;
        }


        if (pushDirection) {
            // slide 32 pixels in 46 frames
            mover.push(pushDirection, 32, 32/8);
        }

    };

    var endPush = function() {
        info.complete = true;
    };

    // Returns true if this source moved this frame
    my.executeMove = function(room) {

        if (!info) return false;

        if (info.complete) {
            info = null;
            return false;
        }

        if (info.distance <= 0) {
            endPush();
            return false;
        }

        // determine movement amount
        var amount = info.velocity;
        if (amount > info.distance) {
            amount = info.distance;
            info.distance = 0;
        } else {
            info.distance -= amount;
        }

        // push does not change facing
        my.attemptSimpleMove(room, info.direction, amount, null);

        return true;
    };

    my.onWallEvent = function(room, wall, rect) {
        endPush();
        my.stopShort(room, wall, info.direction);
    };
    my.onEdgeEvent = function(room, wall, rect) {
        endPush();
    };

    return my;
};