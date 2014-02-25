
var Mover = function(my) {
    my = my || Entity(); // bottom of the chain, ensure my is an entity

    my.canMove = true;

    my.velocity = { x: 0, y: 0 };

    my.hasVelocity = function() {
        return my.velocity.x != 0 || my.velocity.y != 0;
    };

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        executeFrame_parent(room);

        if (my.canMove) {
            processVelocity(room);
        }

    };

    var processVelocity = function(room) {

        if (my.velocity.x != 0 || my.velocity.y != 0) {

            // Get the old position
            var rectOld = my.rect;

            // Calculate the new position based on velocity.
            var rectNew = new Rect(rectOld.x + my.velocity.x, rectOld.y + my.velocity.y, rectOld.width, rectOld.height);

            //this.checkForEdgeEvent(
            my.attemptMove(room, rectNew);
        }
    };

    // Gives the children the chance to override this movement.
    // Should call completeMove if this move is good.
    my.attemptMove = function(room, rectNew) {

        // Check to see if we've gone over the edge
        var edge = isOffEdge(room, rectNew);
        if (edge) {
            // We've gone over an edge, don't complete the move.
            my.onEdgeEvent(room);
            return;
        }

        // no problems, complete move
        my.completeMove(rectNew);
    };

    my.onEdgeEvent = function(room) {

    };

    /// After the move have been confirmed, call this to finalize
    my.completeMove = function(rectNew) {
        my.rect = rectNew;
    };


    /// <summary>
    /// If the rect is outside of the room, it will return the direction of the edge it is off
    /// </summary>
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