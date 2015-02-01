define([
    '../../../../core/model/entity/entity',
    'core/model/icon',
    'core/model/entity/player_hitter',
    'core/model/action/shooter',
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
    Shooter,
    Mortal,
    ItemDropper,
    Push,
    WalkRandom,
    Mover,
    ImageOptions,
    LoadSprites
    ) {

    var spriteInfo = LoadSprites.addSpriteSheet({url:"chains/stages/shin/skull/skull.png", name:"skull"});

    return function () {
        var my = Entity();

        my.icon = Icon(my, spriteInfo.spriteSheet);
        my.icon.drawOffset.y = -2;

        my.isMonster = true;

        PlayerHitter(my);
        Mortal(my);
        Mover(my);

        my.movementSources.push(new Push(my));

        my.wallSensitive = true;
        my.life = 4;


        my.getFootPrint().setSize(16, 16);


        var takeDamage_parent = my.onTakeDamage;
        my.onTakeDamage = function (entity) {
            takeDamage_parent(entity);
            my.pushFromThrust(entity.facing);
        };

        my.onPlayerHit = function(player) {
            player.takeDamage(2, my);
        };

        return my;
    };
});