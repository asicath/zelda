var SwordMissile = function(player, sword) {
    var my = Sword(player);
    Mover(my);

    my.movementSources.push(new Missile(my));

    my.entityType = "sword_missile";
    my.icon.startFlashing();
    my.complete = false;

    my.maxFrame = 10000;



    if (sword) {
        my.position.copy(sword.position);
        my.getFootPrint().setSize(sword.getFootPrint().width, sword.getFootPrint().height);
        my.icon.spriteIndex = sword.icon.spriteIndex;
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

        Explosion.create(room, my.position.x, my.position.y);
    };

    return my;
};
