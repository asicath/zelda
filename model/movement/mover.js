
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

    var footPrintPosition = new Position(0, 0);

    my.attemptMove = function(room, position, source) {

        // Check to see if we've gone over the edge
        var edge = isOffEdge(room, position, my.size);
        if (edge) {
            // We've gone over an edge, don't complete the move.
            if (!source.onEdgeEvent(room)) {return;}
        }

        if (my.wallSensitive) {

            // Get the new foot print to check for wall intersection
            var footPrintSize = my.footPrintSize || my.size;

            footPrintPosition.copy(position);

            if (my.footPrintPosition) {
                footPrintPosition.x = footPrintPosition.x + my.footPrintPosition.x;
                footPrintPosition.y = footPrintPosition.y + my.footPrintPosition.y;
            }

            // Check for wall intersection
            var wall = room.intersectsWall(footPrintPosition, footPrintSize);
            if (wall) {
                source.onWallEvent(room, wall, position);
                return;
            }

        }

        // no problems, complete move
        my.position.copy(position);
    };


    my.footPrint = null;


    /// If the rect is outside of the room, it will return the direction of the edge it is off
    var isOffEdge = function(room, position, size) {
        if (position.x < 0) {
            return Directions.left;
        }
        if (position.y < 0) {
            return Directions.top;
        }
        if (position.x + size.width >= room.rect.width) {
            return Directions.right;
        }
        if (position.y + size.height >= room.rect.height) {
            return Directions.bottom;
        }
        return null;
    };

    return my;
};