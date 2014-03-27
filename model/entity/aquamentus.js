var Aquamentus = function() {
    var my = Entity();
    my = Mover(my);
    //Shooter(my);

    ItemDropper(my);

    my.movementSources.push(new Shuffle(my));

    my.wallSensitive = false;
    my.entityType = 'monster';
    my.life = 12;
    my.invincible = 0;
    my.stepChange = 8;

    my.getFootPrint().setSize(24, 32);

    my.icon.sprites = Sprites.aquamentus;
    my.icon.spriteIndex = 0;
    my.icon.palette = Palettes.LinkGreen;

    var itemDropLevel = 0;

    my.speed = 0.25; // can move 40 pixels in 1s or 60 frames
    my.changeDirectionPercent = 4/16;

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
        var a = room.getIntersectingEntities(my, 'player', 'monsterHit');
        if (a) {
            for (var i = a.length-1; i >= 0; i--) {
                a[i].takeDamage(2, my, room);
            }
        }


    };

    return my;
};




