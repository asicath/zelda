
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

    var attemptPosition = new Position(0, 0);

    my.attemptSimpleMove = function(room, moveDirection, amount, facingDirection) {

        // Change facing if supplied
        if (facingDirection) {
            mover.setFacing(facingDirection);
        }

        attemptPosition.x = mover.position.x;
        attemptPosition.y = mover.position.y;

        switch (moveDirection) {
            case Directions.left:
                attemptPosition.x -= amount;
                break;
            case Directions.right:
                attemptPosition.x += amount;
                break;
            case Directions.top:
                attemptPosition.y -= amount;
                break;
            case Directions.bottom:
                attemptPosition.y += amount;
                break;
        }

        mover.attemptMove(room, attemptPosition, my);
    };

    my.onEdgeEvent = function(room, edge) {

    };

    my.onWallEvent = function(room, wall, rect) {

    };

    var stopShortPosition = new Position(0, 0);

    my.stopShort = function(room, wallRect, moving) {

        stopShortPosition.copy(mover.position);

        // stop short
        switch(moving) {
            case Directions.top:
                var yOffset = mover.footPrintPosition ? mover.footPrintPosition.y : 0;
                // hit wall from the bottom
                stopShortPosition.y = wallRect.y + 16 - yOffset;
                break;
            case Directions.bottom:
                stopShortPosition.y = wallRect.y - mover.size.height;
                break;
            case Directions.left:
                var xOffset = mover.footPrintPosition ? mover.footPrintPosition.x : 0;
                stopShortPosition.x = wallRect.x + 16 - xOffset;
                break;
            case Directions.right:
                stopShortPosition.x = wallRect.x - mover.size.width;
                break;
        }

        // attempt again
        mover.attemptMove(room, stopShortPosition, my);
    };

    return my;
};