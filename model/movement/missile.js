var Missile = function(mover) {
    var my = MovementSource(mover);

    mover.angle = 0;

    var info = {
        angle: 0,
        velocity: 0
    };

    mover.shoot = function(angle, velocity) {
        info.angle = angle;
        info.velocity = velocity;
    };

    mover.shootDirection = function(direction, velocity) {
        var angle;

        switch(direction) {
            case Directions.right: angle = 0; break;
            case Directions.top: angle = Math.PI * 1.5; break;
            case Directions.left: angle = Math.PI; break;
            case Directions.bottom: angle = Math.PI * 0.5; break;
        }

        mover.setFacing(direction);
        mover.shoot(angle, velocity);
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

    my.onWallEvent = function(room, wall, rect) {
        mover.onEdgeEvent(room, wall, rect);
    };

    return my;
};