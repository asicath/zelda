var SwordMissile = function(playerId, sword) {
    var my = Sword(playerId);
    my = Mover(my);

    my.movementSources.push(new Missile(my));


    my.flashing = true;
    my.complete = false;



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

        var ex1 = Explosion(Math.PI * 0.25);
        ex1.rect.x = my.rect.x;
        ex1.rect.y = my.rect.y;
        ex1.spriteIndex = 3;
        room.entities.push(ex1);

        var ex2 = Explosion(Math.PI * 0.75);
        ex2.rect.x = my.rect.x;
        ex2.rect.y = my.rect.y;
        ex2.spriteIndex = 2;
        room.entities.push(ex2);

        var ex3 = Explosion(Math.PI * 1.25);
        ex3.rect.x = my.rect.x;
        ex3.rect.y = my.rect.y;
        ex3.spriteIndex = 0;
        room.entities.push(ex3);

        var ex4 = Explosion(Math.PI * 1.75);
        ex4.rect.x = my.rect.x;
        ex4.rect.y = my.rect.y;
        ex4.spriteIndex = 1;
        room.entities.push(ex4);
    };

    return my;
};
