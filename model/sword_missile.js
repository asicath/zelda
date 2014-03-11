var SwordMissile = function(player, sword) {
    var my = Sword(player);
    my = Mover(my);

    my.movementSources.push(new Missile(my));

    my.entityType = "sword_missile";
    my.flashing = true;
    my.complete = false;

    my.maxFrame = 10000;

    var angle;
    my.setFacing = function(direction) {
        my.facing = direction;


        switch(my.facing) {
            case Directions.right: angle = 0; break;
            case Directions.top: angle = Math.PI * 1.5; break;
            case Directions.left: angle = Math.PI; break;
            case Directions.bottom: angle = Math.PI * 0.5; break;
        }
    };

    if (sword) {
        my.rect = new Rect(sword.rect.x, sword.rect.y, sword.rect.width, sword.rect.height);
        my.spriteIndex = sword.spriteIndex;
        my.setFacing(sword.facing);
    }

    my.launch = function() {
        my.shoot(angle, 204/68);
    };

    my.onHit = function(room) {
        finish(room);
    };

    my.onEdgeEvent = function(room, wall, rect) {
        finish(room);
    };

    var finish = function(room) {
        room.removeAfterFrame.push(my);
        my.complete = true;

        Explosion.create(room, my.rect.x, my.rect.y);
    };

    return my;
};
