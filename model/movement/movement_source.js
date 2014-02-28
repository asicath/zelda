
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

    my.attemptSimpleMove = function(room, direction, amount) {
        mover.setFacing(direction);

        var rect = new Rect(mover.rect.x, mover.rect.y, mover.rect.width, mover.rect.height);

        switch (direction) {
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
    };

    my.onEdgeEvent = function(room, edge) {

    };

    my.onWallEvent = function(room, wall, rect) {

    };

    my.stopShort = function(room, wallRect, moving) {

        var rect = new Rect(mover.rect.x, mover.rect.y, mover.rect.width, mover.rect.height);

        // stop short
        switch(moving) {
            case Directions.top:
                var yOffset = mover.footPrint ? mover.footPrint.y : 0;
                // hit wall from the bottom
                rect.y = wallRect.y + 16 - yOffset;
                break;
            case Directions.bottom:
                rect.y = wallRect.y - mover.rect.height;
                break;
            case Directions.left:
                var xOffset = mover.footPrint ? mover.footPrint.x : 0;
                rect.x = wallRect.x + 16 - xOffset;
                break;
            case Directions.right:
                rect.x = wallRect.x - mover.rect.width;
                break;
        }

        // attempt again
        mover.attemptMove(room, rect, my);
    };

    return my;
};