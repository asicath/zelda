define([
    '../../../../core/model/entity/entity',
    'core/model/icon',
    'core/model/entity/player_hitter',
    'core/model/entity/mortal',
    'core/model/item/item_dropper',
    'core/model/movement/push',
    'core/model/movement/walk_random',
    'core/model/movement/mover',
    'view/image_options',
    'controller/load_sprites'
], function(
    Entity,
    Icon,
    PlayerHitter,
    Mortal,
    ItemDropper,
    Push,
    WalkRandom,
    Mover,
    ImageOptions,
    LoadSprites
    ) {

    var spriteInfo = LoadSprites.addSpriteSheet({url:"chains/stages/shin/wight/wight.png", name:"wight"});

    return function () {
        var my = Entity();

        my.icon = Icon(my, spriteInfo.spriteSheet);
        my.icon.drawOffset.y = -2;

        my.isMonster = true;

        PlayerHitter(my);
        Mortal(my);
        Mover(my);

        ItemDropper(my);

        my.movementSources.push(new WalkRandom(my));
        my.movementSources.push(new Push(my));

        my.wallSensitive = true;

        my.movementSources[0].stepChange = 30;

        my.getFootPrint().setSize(16, 16);
        my.life = 8;

        my.facingSpriteBaseIndex = [0, 0, 0, 0];

        var itemDropLevel = 'a';

        my.speed = 0.1; // can move 40 pixels in 1s or 60 frames
        my.changeDirectionPercent = 6 / 16;
        my.homingPercent = 128 / 255;

        var takeDamage_parent = my.onTakeDamage;
        my.onTakeDamage = function (entity) {
            takeDamage_parent(entity);
            my.pushFromThrust(entity.facing);

            my.speed = 1.0; // can move 40 pixels in 1s or 60 frames
            my.changeDirectionPercent = 6 / 16;
            my.homingPercent = 128 / 255;
            my.facingSpriteBaseIndex = [2, 2, 2, 2];
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