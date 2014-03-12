var SwordMissile = function(player, sword) {
    var my = Sword(player);
    my = Mover(my);

    my.movementSources.push(new Missile(my));

    my.entityType = "sword_missile";
    my.flashing = true;
    my.complete = false;

    my.maxFrame = 10000;



    if (sword) {
        my.rect = new Rect(sword.rect.x, sword.rect.y, sword.rect.width, sword.rect.height);
        my.spriteIndex = sword.spriteIndex;
        my.setFacing(sword.facing);
    }

    my.launch = function() {
        my.shootDirection(my.facing, 204/68);
    };

    my.onHit = function(room) {
        finish(room);
    };

    my.onEdgeEvent = function(room, wall, rect) {
        finish(room);
    };

    var finish = function(room) {
        room.removeEntity(my);
        my.complete = true;

        Explosion.create(room, my.rect.x, my.rect.y);
    };

    return my;
};
