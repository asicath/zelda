define([
    'core/model/entity/entity',
    'core/model/icon',
    'core/model/entity/player_hitter',
    'core/model/movement/missile',
    'core/model/movement/mover',
    'view/sprite_sheet'
], function(
    Entity,
    Icon,
    PlayerHitter,
    Missile,
    Mover,
    SpriteSheet
) {

    var spriteSheet = SpriteSheet({url:"chains/stages/shin/eyeball/fire.png"});

    return function (eyeball) {
        var my = Entity();

        my.icon = Icon(my, spriteSheet);

        PlayerHitter(my);
        Mover(my);

        my.movementSources.push(new Missile(my));

        my.wallSensitive = false;

        my.getFootPrint().setSize(16, 16);

        my.position.x = eyeball.position.x;
        my.position.y = eyeball.position.y;

        my.onPlayerHit = function(player) {
            player.takeDamage(2, my);
            my.room.removeEntity(my);
        };

        my.launch = function() {
            my.shootDirection(Directions.bottom, 204 / 68);
            my.icon.spriteIndex = 2;
        };

        my.onEdgeEvent = function (edge, rect) {
            my.room.removeEntity(my);
        };

        return my;
    };

});