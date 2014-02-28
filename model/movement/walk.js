


var Walk = function(mover) {
    var my = MovementSource(mover);

    var moveIntent = null;

    // Returns true if this source moved this frame
    my.executeMove = function(room) {

        if (!moveIntent) return false;

        var amount = mover.speed;
        

        my.attemptSimpleMove(room, moveIntent, amount);

        return true;
    };

    my.onWallEvent = function(room, wall, rect) {
        my.stopShort(room, wall, moveIntent);
    };

    my.onEdgeEvent = function(room, wall, rect) {

    };

    return my;
};
