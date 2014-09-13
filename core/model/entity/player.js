define(['../action/actor', '../action/thrust_sword', '../action/switch_alt'], function(Actor, ThrustSword, SwitchAlt) {

    return function (playerId, playerInputIndex) {
        var my = Entity();

        my.icon = Icon(my, SpriteSheets.link);

        Mover(my);
        Actor(my);

        my.movementSources.push(new WalkControlled(my));
        my.movementSources.push(new Push(my));


        my.setAction(ThrustSword(my), 'button_a');

        my.altActions = [];

        my.setAltAction = function (action) {
            my.setAction(action, 'button_b');
            my.altWeaponIconIndex = action.weaponIconIndex;
        };

        my.setAction(SwitchAlt(my), 'select');

        my.addAltAction = function (action) {
            my.altActions.push(action);
            my.setAltAction(action);
        };


        my.playerId = playerId;
        my.playerInputIndex = playerInputIndex;
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
        my.speed = 80 / 60; // can move 80 pixels in 1s or 60 frames

        if (playerId == "1")
            my.icon.imageOptions = ImageOptions('purple')
                .addColorSwap("29", "04") // Clothes: Green to Purple
                .addColorSwap("27", "08") // Skin: Brown
                .addColorSwap("17", "1D"); // Hair + Highlights: Dark Grey


        my.setFacing(Directions.top);

        my.monstersKilled = 0;
        my.life = 20;
        my.maxLife = 20;

        var invincible = false;
        my.takeDamage = function (amount, entity) {

            if (invincible) return;

            my.life -= amount;

            invincible = true;

            my.icon.startFlashing();
            my.setFrameTimeout(48, function () {
                my.icon.stopFlashing();
                invincible = false;
            });

            if (my.life <= 0) {
                death();
            }
            else {
                Sounds.hurt.play();
                my.pushFromContact(entity.position);
            }

        };

        var death = function () {

            // remove from the room
            my.room.removeEntity(my);

            // prevent further actions
            my.isDead = true;

            my.room.onPlayerKill(my);


            // replace with a death animation
            var ani = Death(my);
            my.room.addEntity(ani);

            Sounds.playerDefeat.play();
        };

        return my;
    };
});