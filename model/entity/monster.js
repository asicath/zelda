var Monster = function() {
    var my = Entity();
    my = Mover(my);
    Shooter(my);

    ItemDropper(my);

    my.movementSources.push(new WalkRandom(my));
    my.movementSources.push(new Push(my));

    my.wallSensitive = true;
    my.entityType = 'monster';
    my.life = 4;
    my.invincible = 0;
    my.stepChange = 8;

    my.size = {width:16, height:16};

    my.icon.sprites = Sprites.octopus;
    my.icon.spriteIndex = 0;
    my.icon.palette = Palettes.MonsterRed;
    my.icon.drawOffset.y = -2;

    my.facingSpriteBaseIndex = [0, 2, 4, 6];

    var itemDropLevel = 0;

    if (Math.random() < 0.25) {
        // Fast
        my.speed = 1.0; // can move 40 pixels in 1s or 60 frames
        my.changeDirectionPercent = 6/16;
        my.homingPercent = 128/255;
        itemDropLevel = 1;
    }
    else {
        // Slow
        my.speed = 0.5; // can move 40 pixels in 1s or 60 frames
        my.changeDirectionPercent = 4/16;
        my.homingPercent = 64/255;
    }





    my.takeDamage = function(amount, entity, room) {

        if (my.invincible > 0 || my.isDead) return;

        my.life -= amount;

        my.invincible = 30;

        if (my.life <= 0) {
            death(room);

            // keep track of kills

                currentRoom.players[entity.playerId].monstersKilled++;


        }
        else {
            sound_hit.play();
            my.pushFromThrust(entity.facing);
        }

    };

    var death = function(room) {

        // remove from the room
        room.removeEntity(my);

        // tell the room the monster was killed
        room.onMonsterKill(my);

        // prevent further actions
        my.isDead = true;

        // replace with a death animation
        var ani = Death(my, function() {my.dropItem(room, itemDropLevel);});

        room.addEntity(ani);


        sound_kill.play();
    };

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

        if (my.isDead) return;

        executeFrame_parent(room);

        if (my.invincible > 0) {
            my.invincible--;
            my.icon.flashing = true;
        }
        else {
            my.icon.flashing = false;
        }

        // check for intersection with player
        var a = room.getIntersectingEntities(my);
        for (var i = a.length-1; i >= 0; i--) {
            if (a[i].entityType == 'player') {
                a[i].takeDamage(2, my, room);
            }
        }

    };

    return my;
};




