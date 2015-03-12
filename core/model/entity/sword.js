define(['./entity', '../icon', 'core/model/entity/monster_hitter', 'view/sprite_sheet'], function(Entity, Icon, MonsterHitter, SpriteSheet) {

    var spriteSheet = SpriteSheet({url:"core/assets/sprites/sword.png", name:"sword",map:[
        {x:0, y: 0, width: 8, height:16},
        {x:8, y: 0, width: 8, height:16},
        {x:16, y: 0, width: 16, height:8},
        {x:16, y: 8, width: 16, height:8}
    ]});

    return function (player) {
        var my = Entity();

        my.icon = Icon(my, spriteSheet);

        MonsterHitter(my);

        my.canPickupItems = true;
        my.playerId = player.playerId; // expose for kill counting in monster
        my.player = player;             // expose so items can be picked up by swords

        var frame = 0;
        my.maxFrame = 12;

        my.addFrameItem('post', function() {
            frame++;

            if (frame > my.maxFrame) {
                // Make sure the sword doesn't stick around after death
                // should do this differently
                my.room.removeEntity(my);
            }
        });

        my.onMonsterHit = function(monster) {
            monster.takeDamage(4, my);
            my.onHit();
        };


        my.onHit = function () {

        };

        return my;
    };

});