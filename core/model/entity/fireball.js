define(['./entity', '../icon', './player_hitter', '../movement/missile', '../movement/mover', 'view/sprite_sheet', 'core/controller/sound'], function(Entity, Icon, PlayerHitter, Missile, Mover, SpriteSheet, Sound) {

    var spriteSheet = SpriteSheet({url:"core/assets/sprites/ball.png"});
    var shieldSound = Sound('core/assets/sounds/shield.wav');

    return function () {
        var my = Entity();

        my.icon = Icon(my, spriteSheet);
        my.icon.startFlashing();

        PlayerHitter(my);
        Mover(my);

        my.movementSources.push(new Missile(my));

        my.wallSensitive = false;

        my.getFootPrint().setSize(16, 16);


        my.onPlayerHit = function(player) {
            var blocked = false;
            switch (my.facing) {
                case Directions.right:
                    blocked = player.facing == Directions.left;
                    break;
                case Directions.top:
                    blocked = player.facing == Directions.bottom;
                    break;
                case Directions.left:
                    blocked = player.facing == Directions.right;
                    break;
                case Directions.bottom:
                    blocked = player.facing == Directions.top;
                    break;
            }

            if (blocked && player.shieldUp) {
                my.room.removeEntity(my);
                shieldSound.play();
            }
            else {
                player.takeDamage(2, my);
                my.room.removeEntity(my);
            }
        };

        my.onEdgeEvent = function (edge, rect) {
            my.room.removeEntity(my);
        };

        return my;
    };

});