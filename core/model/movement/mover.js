
var Mover = function(my) {

    my.wallSensitive = false;

    my.movementSources = [];

    var executeMove = function() {
        for (var i = my.movementSources.length - 1; i >= 0; i--) {
            if (my.movementSources[i].executeMove()) return;
        }
    };

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function() {

        // allow for inputto be read
        executeFrame_parent();

        // check for new input from player
        executeMove();

    };

    my.facing = Directions.bottom;

    my.setFacing = function(direction) {
        my.facing = direction;
    };

    var rectWall = null;

    my.attemptMove = function(rect, source) {

        // Check to see if we've gone over the edge
        var edge = isOffEdge(rect);
        if (edge) {
            // We've gone over an edge, don't complete the move.
            if (!source.onEdgeEvent(edge, rect)) {return;}
        }

        if (my.wallSensitive) {

            if (!rectWall) {
                var copyFrom = my.getFootPrint('wall');
                rectWall = new Rect(new Position(0, 0), copyFrom.width, copyFrom.height, copyFrom.xOffset, copyFrom.yOffset);
            }

            // set the proposed position for checking for wall intersection
            rectWall.position.copy(rect.position);

            // Check for wall intersection
            var wall = my.room.intersectsWall(rectWall);
            if (wall) {
                source.onWallEvent(wall, rectWall);
                return;
            }

        }

        // no problems, complete move
        my.position.copy(rect.position);
    };

    /// If the rect is outside of the room, it will return the direction of the edge it is off
    var isOffEdge = function(rect) {
        if (rect.position.x < 0) {
            return Directions.left;
        }
        if (rect.position.y < 0) {
            return Directions.top;
        }
        if (rect.position.x + rect.width > my.room.rect.width) {
            return Directions.right;
        }
        if (rect.position.y + rect.height > my.room.rect.height) {
            return Directions.bottom;
        }
        return null;
    };

};