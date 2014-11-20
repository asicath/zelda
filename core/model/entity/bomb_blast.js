define(['./entity', 'core/model/entity/monster_hitter', 'core/model/entity/player_hitter'], function(Entity, MonsterHitter) {

    return function (player) {
        var my = Entity();

        MonsterHitter(my);

        my.icon = null;
        my.visible = false;
        my.getFootPrint().setSize(16, 16);

        my.onMonsterHit = function(monster) {
            monster.takeDamage(8, player);
        };

        my.onPlayerHit = function(player) {
            player.takeDamage(4, my);
        };

        my.setFrameTimeout(10, function () {
            my.room.removeEntity(my);
        });

        return my;
    };

});
