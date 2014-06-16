var Mortal = function(my) {

    my.life = 4;
    my.invincible = 0;

    my.takeDamage = function(amount, entity, room) {

        if (my.invincible > 0 || my.isDead) return;

        my.life -= amount;

        my.invincible = 30;

        if (my.life <= 0) {
            death(room, entity);
        }
        else {
            Sounds.hit.play();
            my.onTakeDamage(entity);
        }

    };

    my.onTakeDamage = function(entity) {};

    var death = function(room, entity) {

        // remove from the room
        room.removeEntity(my);

        // tell the room the monster was killed
        room.onMonsterKill(my, entity);

        // prevent further actions
        my.isDead = true;

        // replace with a death animation
        var ani = Death(my, my.afterDeath);
        room.addEntity(ani);

        Sounds.kill.play();
    };

    my.afterDeath = function() {};

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

        if (my.isDead) return;

        // If dead, don't do anything else
        executeFrame_parent(room);

        if (my.invincible > 0) {
            my.invincible--;
            my.icon.flashing = true;
        }
        else {
            my.icon.flashing = false;
        }

    };

};