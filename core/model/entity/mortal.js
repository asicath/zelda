var Mortal = function(my) {

    my.life = 4;
    var invincible = 0;

    my.takeDamage = function(amount, entity, room) {

        if (invincible || my.isDead) return;

        my.life -= amount;

        if (my.life <= 0) {
            death(room, entity);
        }
        else {
            Sounds.hit.play();
            my.onTakeDamage(entity);
        }

    };

    my.onTakeDamage = function(entity) {

        invincible = true;

        my.icon.startFlashing();
        my.setFrameTimeout(30, function() {
            my.icon.stopFlashing();
            invincible = false;
        });

    };

    var death = function(room, entity) {

        // remove from the room
        room.removeEntity(my);

        // tell the room the monster was killed
        if (my.entityType == 'player') {
            room.onPlayerKill(my, entity);
        }
        else {
            my.onDeath(my, entity);
        }




        // prevent further actions
        my.isDead = true;

        // replace with a death animation
        var ani = Death(my, my.afterDeath);
        room.addEntity(ani);

        Sounds.kill.play();
    };

    my.onDeath = function(killed, killer) {};

    my.afterDeath = function() {};

};