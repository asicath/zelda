define(function() {

    return function () {
        var my = Entity();

        my.icon = Icon(my, SpriteSheets.ball);
        my.icon.startFlashing();

        Mover(my);

        my.movementSources.push(new Missile(my));

        my.wallSensitive = false;
        my.entityType = "fireball";


        my.getFootPrint().setSize(16, 16);


        var executeFrame_parent = my.executeFrame;
        my.executeFrame = function () {
            executeFrame_parent();

            // check for intersection
            var a = my.room.getIntersectingEntities(my, 'player', 'monsterHit');
            if (a) {
                var e;
                for (var i = a.length - 1; i >= 0; i--) {
                    e = a[i];

                    var blocked = false;
                    switch (my.facing) {
                        case Directions.right:
                            blocked = e.facing == Directions.left;
                            break;
                        case Directions.top:
                            blocked = e.facing == Directions.bottom;
                            break;
                        case Directions.left:
                            blocked = e.facing == Directions.right;
                            break;
                        case Directions.bottom:
                            blocked = e.facing == Directions.top;
                            break;
                    }

                    // Needs big shield to block
                    blocked = false;

                    if (blocked && e.shieldUp) {
                        my.room.removeEntity(my);
                        Sounds.shield.play();
                    }
                    else {
                        e.takeDamage(2, my);
                        my.room.removeEntity(my);
                    }

                }
            }

        };

        my.onEdgeEvent = function (edge, rect) {
            my.room.removeEntity(my);
        };

        return my;
    };

});