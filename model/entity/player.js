var Player = function(playerId) {
    var my = Entity();
    my = Mover(my);
    Actor(my);

    my.movementSources.push(new WalkControlled(my));
    my.movementSources.push(new Push(my));

    my.action = ThrustSword(my);
    my.specialAction = SwordRain(my);

    my.playerId = playerId;
    my.wallSensitive = true;
    my.entityType = 'player';

    my.getFootPrint().setSize(16, 16);

    if (playerId == 0) {
        my.position.x = 32;
        my.position.y = 48;
    }
    else {
        my.position.x = 208;
        my.position.y = 112;
    }

    my.shieldUp = true;

    my.footPrints.wall = new Rect(my.position, 16, 8, 0, 8);
    my.footPrints.monsterHit = new Rect(my.position, 2, 2, 7, 7);

    my.facingSpriteBaseIndex = [0, 3, 6, 9];
    my.speed = 80/60; // can move 80 pixels in 1s or 60 frames

    my.icon.sprites = Sprites.link;
    my.icon.palette = Palettes.LinkGreen;

    my.setFacing(Directions.top);

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

        if (my.invincible > 0) {
            my.invincible--;
            my.icon.flashing = true;
        }
        else {
            my.icon.flashing = false;
        }

        executeFrame_parent(room);
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
            my.pushFromContact(entity.position);
        }

    };

    var death = function(room) {

        // remove from the room
        room.removeEntity(my);

        // prevent further actions
        my.isDead = true;

        // replace with a death animation
        var ani = Death(my);
        room.addEntity(ani);

        sound_die.play();
    };

    return my;
};