
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

    my.attemptMove = function(room, rect, source) {

        // Check to see if we've gone over the edge
        var edge = isOffEdge(room, rect);
        if (edge) {
            // We've gone over an edge, don't complete the move.
            source.onEdgeEvent(room);
            return;
        }

        if (my.wallSensitive) {

            // Get the new foot print to check for wall intersection
            var footPrint = my.getFootPrint(rect);

            // Check for wall intersection
            var wall = room.intersectsWall(footPrint);
            if (wall) {
                source.onWallEvent(room, wall, rect);
                return;
            }

        }

        // no problems, complete move
        my.rect = rect;
    };

    my.footPrint = null;

    my.getFootPrint = function(rect) {
        // The default footprint is what ever the entity's rect is
        if (!my.footPrint) {return rect;}
        // Otherwise derive one from the footprint
        return new Rect(rect.x + my.footPrint.x, rect.y + my.footPrint.y, my.footPrint.width, my.footPrint.height);
    };

    /// If the rect is outside of the room, it will return the direction of the edge it is off
    var isOffEdge = function(room, rect) {
        if (rect.x < 0) {
            return Directions.left;
        }
        if (rect.y < 0) {
            return Directions.top;
        }
        if (rect.x + rect.width >= room.rect.width) {
            return Directions.right;
        }
        if (rect.y + rect.height >= room.rect.height) {
            return Directions.bottom;
        }
        return null;
    };

    return my;
};