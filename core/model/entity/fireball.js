define(['./entity', '../icon', './player_hitter', '../movement/missile', '../movement/mover'], function(Entity, Icon, PlayerHitter, Missile, Mover) {

    return function () {
        var my = Entity();

        my.icon = Icon(my, SpriteSheets.ball);
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
                Sounds.shield.play();
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