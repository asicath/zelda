


var Walk = function(mover) {
    var my = MovementSource(mover);

    my.moveIntent = null;

    // Returns true if this source moved this frame
    my.executeMove = function(room) {

        if (!my.moveIntent) return false;

        var amount = mover.speed;


        my.attemptSimpleMove(room, my.moveIntent, amount);

        return true;
    };

    my.onWallEvent = function(room, wall, rect) {
        my.stopShort(room, wall, my.moveIntent);
    };

    my.onEdgeEvent = function(room, wall, rect) {

    };

    return my;
};
