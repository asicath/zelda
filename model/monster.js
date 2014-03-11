var Monster = function() {
    var my = Entity();
    my = Mover(my);

    ItemDropper(my);

    my.movementSources.push(new WalkRandom(my));
    my.movementSources.push(new Push(my));

    my.wallSensitive = true;

    my.entityType = 'monster';
    my.life = 4;
    my.invincible = 0;
    my.stepChange = 8;
    my.rect = new Rect(128, 88, 16, 16);
    my.sprites = Sprites.octopus;
    my.facingSpriteBaseIndex = [0, 2, 4, 6];
    my.spriteIndex = 0;
    my.palette = Palettes.MonsterRed;

    my.drawOffset.y = -2;

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

    my.haltPercent = 3/16;



    my.takeDamage = function(amount, entity, room) {

        if (my.invincible > 0 || my.isDead) return;

        my.life -= amount;

        my.invincible = 30;

        if (my.life <= 0) {
            death(room);

            // keep track of kills
            if (entity.playerId) {
                currentRoom.players[entity.playerId].monstersKilled++;
            }

        }
        else {
            sound_hit.play();
            my.pushFromThrust(entity.facing);
        }

    };

    var death = function(room) {

        // remove from the room
        room.removeEntity(my);

        // Cause two more monsters to spawn
        room.countToAddMonster = 30;
        room.addCount += 2;

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
            my.flashing = true;
        }
        else {
            my.flashing = false;
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




