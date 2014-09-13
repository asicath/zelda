define(['./movement_source'], function(MovementSource) {

    return function (mover) {
        var my = MovementSource(mover);

        var info = null;

        // give the mover a push function
        mover.push = function (direction, distance, velocity) {
            info = {
                direction: direction,
                distance: distance,
                velocity: velocity,
                complete: false
            }
        };

        // Will always be pushed, but only aligned to the last walk direction
        mover.pushFromContact = function (position) {

            var pushDirection;

            if (!mover.isWalker) {
                // Don't move?
            }
            else if (mover.lastWalkDirection == Directions.top || mover.lastWalkDirection == Directions.bottom) {
                if (position.y > mover.position.y) {
                    pushDirection = Directions.top;
                }
                else {
                    pushDirection = Directions.bottom;
                }
            }
            else if (mover.lastWalkDirection == Directions.left || mover.lastWalkDirection == Directions.right) {
                if (position.x > mover.position.x) {
                    pushDirection = Directions.left;
                }
                else {
                    pushDirection = Directions.right;
                }
            }

            if (pushDirection) {
                // slide 32 pixels in 8 frames
                mover.push(pushDirection, 32, 32 / 8);
            }

        };

        // will not be pushed unless thrustDirection aligns with the guide the walker is on
        mover.pushFromThrust = function (thrustDirection) {

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
                // slide 64 pixels in 16 frames
                mover.push(pushDirection, 64, 64 / 16);
            }

        };

        var endPush = function () {
            info.complete = true;
        };

        // Returns true if this source moved this frame
        my.executeMove = function () {

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
            my.attemptSimpleMove(info.direction, amount, null);

            return true;
        };

        my.onWallEvent = function (wall, rect) {
            endPush();
            my.stopShort(wall.rect, info.direction);
        };
        my.onEdgeEvent = function (edge, rect) {
            endPush();
        };

        return my;
    };

});