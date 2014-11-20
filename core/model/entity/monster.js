define([
    './entity',
    '../icon',
    './player_hitter',
    '../action/shooter',
    './mortal',
    '../item/item_dropper',
    '../movement/push',
    '../movement/walk_random',
    '../movement/mover',
    'view/image_options',
    'controller/load_sprites'
], function(
    Entity,
    Icon,
    PlayerHitter,
    Shooter,
    Mortal,
    ItemDropper,
    Push,
    WalkRandom,
    Mover,
    ImageOptions,
    LoadSprites
    ) {

    var spriteInfo = LoadSprites.addSpriteSheet({url:"core/assets/sprites/octopus.gif", name:"octopus"});

    return function (level) {
        var my = Entity();

        my.icon = Icon(my, spriteInfo.spriteSheet);
        my.icon.drawOffset.y = -2;

        my.isMonster = true;

        PlayerHitter(my);
        Mortal(my);
        Mover(my);
        Shooter(my);

        ItemDropper(my);

        my.movementSources.push(new WalkRandom(my));
        my.movementSources.push(new Push(my));

        my.wallSensitive = true;

        if (level == 1) {
            my.life = 4;
        }
        else if (level == 2) {
            my.life = 8;
            my.icon.imageOptions = ImageOptions.RedToBlue;
        }


        my.stepChange = 8;

        my.getFootPrint().setSize(16, 16);


        my.facingSpriteBaseIndex = [0, 2, 4, 6];

        var itemDropLevel = 'a';

        if (Math.random() < 0.25) {
            // Fast
            my.speed = 1.0; // can move 40 pixels in 1s or 60 frames
            my.changeDirectionPercent = 6 / 16;
            my.homingPercent = 128 / 255;
            itemDropLevel = 'b';
        }
        else {
            // Slow
            my.speed = 0.5; // can move 40 pixels in 1s or 60 frames
            my.changeDirectionPercent = 4 / 16;
            my.homingPercent = 64 / 255;
        }

        var takeDamage_parent = my.onTakeDamage;
        my.onTakeDamage = function (entity) {
            takeDamage_parent(entity);
            my.pushFromThrust(entity.facing);
        };

        my.afterDeath = function () {
            my.dropItem(itemDropLevel);
        };

        my.onPlayerHit = function(player) {
            player.takeDamage(2, my);
        };

        return my;
    };
});