define([
    './entity',
    '../icon',
    '../action/actor',
    '../action/thrust_sword',
    //'chains/weapons/flamesword/thrust_flame',
    '../action/switch_alt',
    './death',
    '../movement/push',
    '../movement/walk_controlled',
    '../movement/mover',
    '../rect',
    'view/image_options',
    'view/sprite_sheet',
    'core/controller/sound'
], function(
    Entity,
    Icon,
    Actor,
    ThrustSword,
    SwitchAlt,
    Death,
    Push,
    WalkControlled,
    Mover,
    Rect,
    ImageOptions,
    SpriteSheet,
    Sound
    ) {

    var spriteSheet = SpriteSheet({url:"core/assets/sprites/link.png"});
    var hurtSound = Sound('core/assets/sounds/hurt.wav');
    var deathSound = Sound('core/assets/sounds/death1_B.wav');

    return function (playerId, playerInputIndex) {
        var my = Entity();

        my.icon = Icon(my, spriteSheet);

        Mover(my);
        Actor(my);

        my.movementSources.push(new WalkControlled(my));
        my.movementSources.push(new Push(my));

        my.isPlayer = true;
        my.canPickupItems = true;

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
        my.monstersKilled = 0;

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
                hurtSound.play();
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

            deathSound.play();
        };

        return my;
    };
});