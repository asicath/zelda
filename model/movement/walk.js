


var Walk = function(mover) {
    var my = MovementSource(mover);

    // Returns true if this source moved this frame
    my.executeMove = function(room) {

        //mover.rect.x += 0.25;

        return true;
    };

    return my;
};
