
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

        mover.setFacing(info.direction);

        // determine movement amount
        var amount = info.velocity;
        if (amount > info.distance) {
            amount = info.distance;
            info.distance = 0;
        } else {
            info.distance -= amount;
        }

        var rect = new Rect(mover.rect.x, mover.rect.y, mover.rect.width, mover.rect.height);

        switch (info.direction) {
            case Directions.left:
                rect.x -= amount;
                break;
            case Directions.right:
                rect.x += amount;
                break;
            case Directions.top:
                rect.y -= amount;
                break;
            case Directions.bottom:
                rect.y += amount;
                break;
        }

        mover.attemptMove(room, rect, my);

        return true;
    };

    my.onWallEvent = function(room, wall, rect) {
        endPush();
    };
    my.onEdgeEvent = function(room, wall, rect) {
        endPush();
    };

    return my;
};