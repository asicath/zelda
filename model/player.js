var Player = function(playerId) {
    var my = Entity();
    my = Mover(my);
    my = Actor(my);

    my.movementSources.push(new WalkControlled(my));
    my.movementSources.push(new Push(my));

    my.action = ThrustSword(my);
    my.specialAction = SwordRain(my);

    my.playerId = playerId;
    my.wallSensitive = true;
    my.entityType = 'player';

    if (playerId == 0) {
        my.rect = new Rect(32, 48, 16, 16);
    }
    else {
        my.rect = new Rect(208, 112, 16, 16);
    }


    my.footPrint = new Rect(0, 8, 16, 8); // has a smaller foot print than the monsters
    my.facingSpriteBaseIndex = [0, 3, 6, 9];
    my.sprites = Sprites.link;
    my.palette = Palettes.LinkGreen;
    my.speed = 80/60; // can move 80 pixels in 1s or 60 frames

    my.setFacing(Directions.top);

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

        if (my.invincible > 0) {
            my.invincible--;
            my.flashing = true;
        }
        else {
            my.flashing = false;
        }

        executeFrame_parent(room);
    };

    my.getHitZone = function(entity) {

        if (entity.entityType == "sword" || entity.entityType == "sword_missile") {return my.rect;}

        return new Rect(my.rect.x + 7, my.rect.y + 7, 2, 2);
    };

    my.monstersKilled = 0;
    my.life = 20;
    my.maxLife = 20;
    my.invincible = 0;
    my.takeDamage = function(amount, entity, room) {

        if (my.invincible > 0) return;

        my.life -= amount;

        my.invincible = 48;

        if (my.life <= 0) {
            death(room);
        }
        else {
            sound_hurt.play();
            my.pushFromContact(entity.rect);
        }

    };

    var death = function(room) {

        // remove from the room
        room.removeAfterFrame.push(my);

        // Cause two more monsters to spawn
        //room.countToAddMonster = 30;
        //room.addCount += 2;

        // prevent further actions
        my.isDead = true;

        // replace with a death animation
        var ani = Death(my);
        room.addEntity(ani);


        //sound_kill.play();
        sound_die.play();
    };

    return my;
};