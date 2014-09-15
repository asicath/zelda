define([
    './entity',
    '../icon',
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
    Shooter,
    Mortal,
    ItemDropper,
    Push,
    WalkRandom,
    Mover,
    ImageOptions,
    LoadSprites
    ) {

    LoadSprites.addSpriteSheet({url:"assets/sprites/octopus.gif", name:"octopus"});

    return function (level) {
        var my = Entity();

        my.icon = Icon(my, SpriteSheets.octopus);
        my.icon.drawOffset.y = -2;

        Mortal(my);
        Mover(my);
        Shooter(my);

        ItemDropper(my);

        my.movementSources.push(new WalkRandom(my));
        my.movementSources.push(new Push(my));

        my.wallSensitive = true;
        my.entityType = 'monster';

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

        var executeFrame_parent = my.executeFrame;
        my.executeFrame = function () {

            executeFrame_parent();

            // check for intersection with player
            var a = my.room.getIntersectingEntities(my, 'player', 'monsterHit');
            if (a) {
                for (var i = a.length - 1; i >= 0; i--) {
                    a[i].takeDamage(2, my);
                }
            }


        };

        return my;
    };
});