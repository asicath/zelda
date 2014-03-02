var SwordMissile = function(playerId, sword) {
    var my = Sword(playerId);
    my = Mover(my);

    my.movementSources.push(new Missile(my));

    my.rect = sword.rect;
    my.spriteIndex = sword.spriteIndex;
    my.facing = sword.facing;
    my.flashing = true;
    my.complete = false;

    var angle;
    switch(my.facing) {
        case Directions.right: angle = 0; break;
        case Directions.top: angle = Math.PI * 1.5; break;
        case Directions.left: angle = Math.PI; break;
        case Directions.bottom: angle = Math.PI * 0.5; break;
    }


    my.shoot(angle, 204/68);

    my.onHit = function(room) {
        // should be combined with edge hit
        room.removeAfterFrame.push(my);
        my.complete = true;
    };

    my.onEdgeEvent = function(room, wall, rect) {
        room.removeAfterFrame.push(my);
        my.complete = true;
    };

    return my;
};
