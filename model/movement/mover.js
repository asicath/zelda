
var Mover = function(my) {
    my = my || Entity(); // bottom of the chain, ensure my is an entity

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

    // After the move have been confirmed, call this to finalize
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