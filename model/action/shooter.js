var Shooter = function(my) {

    my.shootPercent = 3/16;

    var setCheckShoot = function() {
        my.setFrameTimeout(16, function(room) {
            if (Math.random() < my.shootPercent) {
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
        my.canWalk = false;

        // Create the missile
        my.setFrameTimeout(34, function(room) {
            createMissile(room);
        });

        // when done shooting, allow walk and wait for next
        my.setFrameTimeout(49, function() {
            my.canWalk = true;
            setCheckShoot();
        });
    };

    var createMissile = function(room) {
        var missile = Rock();

        missile.position.x = my.position.x;
        missile.position.y = my.position.y;

        room.addEntity(missile);

        missile.shootDirection(my.facing, 204/68);
    };

    var missilePosition = {};
    missilePosition[Directions.top] = { x: 3, y: -12 };
    missilePosition[Directions.bottom] = { x: 5, y: 11 };
    missilePosition[Directions.left] = { x: -12, y: 5 };
    missilePosition[Directions.right] = { x: 12, y: 5 };

};