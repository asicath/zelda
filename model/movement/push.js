
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

        my.attemptSimpleMove(room, info.direction, amount);

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