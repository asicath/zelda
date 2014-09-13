define(['../entity/fireball'], function(Fireball) {

    return function (my) {

        my.shootPercent = 3 / 16;

        my.fireballAngles = [1];

        var setCheckShoot = function () {
            my.setFrameTimeout(16, function () {
                if (Math.random() < my.shootPercent && !my.isFrozen()) {
                    // shooting!
                    shoot();
                }
                else {
                    // no shoot, wait again
                    setCheckShoot();
                }
            });
        };

        // setup the shoot check interval
        setCheckShoot();

        var shoot = function () {

            // Can't walk while shooting
            my.freeze();

            // Create the missile
            my.setFrameTimeout(34, function () {
                createMissile();
            });

            // when done shooting, allow walk and wait for next
            my.setFrameTimeout(49, function () {
                my.unfreeze();
                setCheckShoot();
            });

        };

        var createMissile = function () {
            // find a player
            var target = null;

            if (my.room.players.length == 1) {
                target = my.room.players[0];
            }
            else {
                target = my.room.players[Math.floor(Math.random() * my.room.players.length)];
            }

            // no target no missile
            if (!target) return;


            // find the direct angle
            var xDiff = target.position.x - my.position.x;
            var yDiff = target.position.y - my.position.y;
            var angle = Math.atan2(yDiff, xDiff);

            for (var i = 0; i < my.fireballAngles.length; i++) {
                shootFireball(angle * my.fireballAngles[i]);
            }

        };

        var shootFireball = function (angle) {
            var missile = Fireball();

            missile.position.x = my.position.x;
            missile.position.y = my.position.y;

            my.room.addEntity(missile);

            missile.shoot(angle, 3);
        };

        var missilePosition = {};
        missilePosition[Directions.top] = { x: 3, y: -12 };
        missilePosition[Directions.bottom] = { x: 5, y: 11 };
        missilePosition[Directions.left] = { x: -12, y: 5 };
        missilePosition[Directions.right] = { x: 12, y: 5 };

    };

});