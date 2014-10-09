define([
    './entity',
    '../icon',
    './player_hitter',
    '../action/aimed_shooter',
    './mortal',
    '../item/item_dropper',
    '../movement/shuffle',
    '../movement/mover',
    'controller/load_sprites'
], function(
    Entity,
    Icon,
    PlayerHitter,
    AimedShooter,
    Mortal,
    ItemDropper,
    Shuffle,
    Mover,
    LoadSprites
    ) {

    LoadSprites.addSpriteSheet({url:"core/assets/sprites/aquamentus.gif", name:"aquamentus", map:[
        {x:0,  y: 0, width: 24, height:32},
        {x:24, y: 0, width: 24, height:32},
        {x:48, y: 0, width: 24, height:32},
        {x:72, y: 0, width: 24, height:32}
    ]});

    return function () {

        var my = Entity();

        my.icon = Icon(my, SpriteSheets.aquamentus);

        my.isMonster = true;

        PlayerHitter(my);
        Mortal(my);
        Mover(my);
        AimedShooter(my);

        ItemDropper(my);

        my.movementSources.push(new Shuffle(my));

        my.wallSensitive = false;
        my.entityType = 'monster';
        my.life = 20;

        my.stepChange = 8;

        my.getFootPrint().setSize(24, 32);

        my.fireballAngles = [0.9, 1, 1.1];
        my.shuffleDirection = [null, Directions.left, Directions.left, Directions.right, Directions.right];

        my.speed = 0.25;
        my.changeDirectionPercent = 4 / 16;

        my.afterDeath = function () {
            my.dropItem('c');
        };

        my.onPlayerHit = function(player) {
            player.takeDamage(2, my);
        };

        return my;
    };

});



