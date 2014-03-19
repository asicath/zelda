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

    var moveRect = null;

    // Returns true if this source moved this frame
    my.executeMove = function(room) {

        if (info.velocity == 0) return false;

        if (!moveRect) {
            moveRect = new Rect(new Position(0, 0), mover.rect.width, mover.rect.height, 0, 0);
        }

        moveRect.position.copy(mover.position);

        // just go right for now
        moveRect.position.x += Math.cos(info.angle) * info.velocity;
        moveRect.position.y += Math.sin(info.angle) * info.velocity;

        mover.attemptMove(room, moveRect, my);

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