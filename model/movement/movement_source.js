
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

    my.attemptSimpleMove = function(room, moveDirection, amount, facingDirection) {

        // Change facing if supplied
        if (facingDirection) {
            mover.setFacing(facingDirection);
        }

        var position = {x: mover.position.x, y: mover.position.y};

        switch (moveDirection) {
            case Directions.left:
                position.x -= amount;
                break;
            case Directions.right:
                position.x += amount;
                break;
            case Directions.top:
                position.y -= amount;
                break;
            case Directions.bottom:
                position.y += amount;
                break;
        }

        mover.attemptMove(room, position, my);
    };

    my.onEdgeEvent = function(room, edge) {

    };

    my.onWallEvent = function(room, wall, rect) {

    };

    my.stopShort = function(room, wallRect, moving) {

        var position = {x: mover.position.x, y: mover.position.y};

        // stop short
        switch(moving) {
            case Directions.top:
                var yOffset = mover.footPrintPosition ? mover.footPrintPosition.y : 0;
                // hit wall from the bottom
                position.y = wallRect.y + 16 - yOffset;
                break;
            case Directions.bottom:
                position.y = wallRect.y - mover.size.height;
                break;
            case Directions.left:
                var xOffset = mover.footPrintPosition ? mover.footPrintPosition.x : 0;
                position.x = wallRect.x + 16 - xOffset;
                break;
            case Directions.right:
                position.x = wallRect.x - mover.size.width;
                break;
        }

        // attempt again
        mover.attemptMove(room, position, my);
    };

    return my;
};