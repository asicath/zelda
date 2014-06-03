
var Directions = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right'
};

var MovementSource = function(mover) {
    var my = {};

    // Returns true if this source moved this frame
    my.executeMove = function(room) {
        return false;
    };

    var attemptRect = null;

    my.attemptSimpleMove = function(room, moveDirection, amount, facingDirection) {

        // Change facing if supplied
        if (facingDirection) {
            mover.setFacing(facingDirection);
        }

        if (!attemptRect) {
            attemptRect = new Rect(new Position(0, 0), mover.getFootPrint().width, mover.getFootPrint().height, 0, 0);
        }

        attemptRect.position.copy(mover.position);

        switch (moveDirection) {
            case Directions.left:
                attemptRect.position.x -= amount;
                break;
            case Directions.right:
                attemptRect.position.x += amount;
                break;
            case Directions.top:
                attemptRect.position.y -= amount;
                break;
            case Directions.bottom:
                attemptRect.position.y += amount;
                break;
        }

        mover.attemptMove(room, attemptRect, my);
    };

    my.onEdgeEvent = function(room, edge) {

    };

    my.onWallEvent = function(room, wall, rect) {

    };

    var stopShortRect = null;

    my.stopShort = function(room, wallRect, moving) {

        if (!stopShortRect) {
            stopShortRect = new Rect(new Position(0, 0), mover.getFootPrint().width, mover.getFootPrint().height, 0, 0);
        }

        stopShortRect.position.copy(mover.position);

        // stop short
        switch(moving) {
            case Directions.top:
                var yOffset = mover.getFootPrint('wall').yOffset;
                // hit wall from the bottom
                stopShortRect.position.y = wallRect.position.y + wallRect.height - yOffset;
                break;
            case Directions.bottom:
                stopShortRect.position.y = wallRect.position.y - mover.getFootPrint().height;
                break;
            case Directions.left:
                var xOffset = mover.getFootPrint('wall').xOffset;
                stopShortRect.position.x = wallRect.position.x + wallRect.width - xOffset;
                break;
            case Directions.right:
                stopShortRect.position.x = wallRect.position.x - mover.getFootPrint().width;
                break;
        }

        // attempt again
        mover.attemptMove(room, stopShortRect, my);
    };

    return my;
};