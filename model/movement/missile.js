var Missile = function(mover) {
    var my = MovementSource(mover);

    var info = {
        angle: 0,
        velocity: 0
    };

    mover.shoot = function(angle, velocity) {
        info.angle = angle;
        info.velocity = velocity;
    };

    // Returns true if this source moved this frame
    my.executeMove = function(room) {

        if (info.velocity == 0) return false;

        var rect = new Rect(mover.rect.x, mover.rect.y, mover.rect.width, mover.rect.height);

        // just go right for now
        rect.x += Math.cos(info.angle) * info.velocity;
        rect.y += Math.sin(info.angle) * info.velocity;

        mover.attemptMove(room, rect, my);

        return true;
    };

    my.onEdgeEvent = function(room, wall, rect) {
        return mover.onEdgeEvent(room, wall, rect);
    };

    return my;
};