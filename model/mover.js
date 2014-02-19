
var Mover = function() {
    var my = Entity();

    my.canMove = true;

    //my.xVelocity = 0;
    //my.yVelocity = 0;

    my.velocity = { x: 0, y: 0 };

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
            var rectNew = Rect(rectOld.x + my.velocity.x, rectOld.y + my.velocity.y, rectOld.width, rectOld.height);

            //this.checkForEdgeEvent(
            my.attemptMove(room, rectNew, my.velocity.x, my.velocity.y);
        }
    };

    // Gives the children the chance to override this movement.
    // Should call completeMove if this move is good.
    my.attemptMove = function(room, rectNew, xV, yV) {

        // Check to see if we've gone over the edge
        var edge = isOffEdge(room, rectNew);
        if (edge) {
            // We've gone over an edge, don't complete the move.
            //this.OnEdgeEvent(edge, room);
            return;
        }

        // no problems, complete move
        my.completeMove(rectNew);
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
            return Direction.Left;
        }
        if (rect.y < 0) {
            return Direction.Top;
        }
        if (rect.x + rect.width >= room.rect.width) {
            return Direction.Right;
        }
        if (rect.y + rect.height >= room.rect.height) {
            return Direction.Bottom;
        }
        return null;
    };



    /*

    public delegate void EdgeEventHandler(Direction direction, Room room);
    public event EdgeEventHandler EdgeEvent;

    /// <summary>
    /// Determines if the new position will go over the edge.
    /// If true, it will send an edge event.
    /// </summary>
    private bool checkForEdgeEvent(Room room, Rectangle rect) {
        Direction d = isOffEdge(room, rect);
        if (d != Direction.None) {
            this.OnEdgeEvent(d, room);
            return true;
        }
        return false;
    }

    private void OnEdgeEvent(Direction direction, Room room) {
        if (EdgeEvent != null) {
            EdgeEvent(direction, room);
        }
    }

    */

    return my;
};