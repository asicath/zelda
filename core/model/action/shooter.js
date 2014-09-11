var Shooter = function(my) {

    my.shootPercent = 3/16;

    var setCheckShoot = function() {
        my.setFrameTimeout(16, function() {
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

    var shoot = function() {
        my.freeze();

        // Create the missile
        my.setFrameTimeout(34, function() {
            createMissile();
        });

        // when done shooting, allow walk and wait for next
        my.setFrameTimeout(49, function() {
            my.unfreeze();
            setCheckShoot();
        });
    };

    var createMissile = function() {
        var missile = Rock();

        missile.position.x = my.position.x;
        missile.position.y = my.position.y;

        my.room.addEntity(missile);

        missile.shootDirection(my.facing, 204/68);
    };

    var missilePosition = {};
    missilePosition[Directions.top] = { x: 3, y: -12 };
    missilePosition[Directions.bottom] = { x: 5, y: 11 };
    missilePosition[Directions.left] = { x: -12, y: 5 };
    missilePosition[Directions.right] = { x: 12, y: 5 };

};