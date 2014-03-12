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

    mover.angle = 0;
    mover.setFacing = function(direction) {
        mover.facing = direction;

        switch(mover.facing) {
            case Directions.right: mover.angle = 0; break;
            case Directions.top: mover.angle = Math.PI * 1.5; break;
            case Directions.left: mover.angle = Math.PI; break;
            case Directions.bottom: mover.angle = Math.PI * 0.5; break;
        }
    };

    return my;
};