
var Mover = function(my) {
    var my = my || Entity();

    my.wallSensitive = false;

    my.movementSources = [];

    var executeMove = function(room) {
        for (var i = my.movementSources.length - 1; i >= 0; i--) {
            if (my.movementSources[i].executeMove(room)) return;
        }
    };

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

        // allow for inputto be read
        executeFrame_parent(room);

        // check for new input from player
        executeMove(room);

    };

    my.facing = Directions.bottom;

    my.setFacing = function(direction) {
        my.facing = direction;
    };

    var rectWall = null;

    my.attemptMove = function(room, rect, source) {

        // Check to see if we've gone over the edge
        var edge = isOffEdge(room, rect);
        if (edge) {
            // We've gone over an edge, don't complete the move.
            if (!source.onEdgeEvent(room)) {return;}
        }

        if (my.wallSensitive) {

            if (!rectWall) {
                var copyFrom = my.rectFootPrint || my.rect;
                rectWall = new Rect(new Position(0, 0), copyFrom.width, copyFrom.height, copyFrom.xOffset, copyFrom.yOffset);
            }

            rectWall.position.copy(rect.position);

            // Check for wall intersection
            var wall = room.intersectsWall(rectWall);
            if (wall) {
                source.onWallEvent(room, wall, rectWall);
                return;
            }

        }

        // no problems, complete move
        my.position.copy(rect.position);
    };


    my.footPrint = null;


    /// If the rect is outside of the room, it will return the direction of the edge it is off
    var isOffEdge = function(room, rect) {
        if (rect.position.x < 0) {
            return Directions.left;
        }
        if (rect.position.y < 0) {
            return Directions.top;
        }
        if (rect.position.x + rect.width >= room.rect.width) {
            return Directions.right;
        }
        if (rect.position.y + rect.height >= room.rect.height) {
            return Directions.bottom;
        }
        return null;
    };

    return my;
};