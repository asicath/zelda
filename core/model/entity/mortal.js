define(['./death'], function(Death) {

    return function (my) {

        my.life = 4;
        var invincible = 0;

        my.takeDamage = function (amount, entity) {

            if (invincible || my.isDead) return;

            my.life -= amount;

            if (my.life <= 0) {
                death(entity);
            }
            else {
                Sounds.hit.play();
                my.onTakeDamage(entity);
            }

        };

        my.onTakeDamage = function (entity) {

            invincible = true;

            my.icon.startFlashing();
            my.setFrameTimeout(30, function () {
                my.icon.stopFlashing();
                invincible = false;
            });

        };

        var death = function (entity) {

            // remove from the room
            my.room.removeEntity(my);

            // tell the room the monster was killed
            if (my.isPlayer) {
                my.room.onPlayerKill(my, entity);
            }
            else {
                my.onDeath(my, entity);
            }


            // prevent further actions
            my.isDead = true;

            // replace with a death animation
            var ani = Death(my, my.afterDeath);
            my.room.addEntity(ani);

            Sounds.kill.play();
        };

        my.onDeath = function (killed, killer) {
        };

        my.afterDeath = function () {
        };

    };

});
