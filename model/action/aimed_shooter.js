var AimedShooter = function(my) {

    my.shootPercent = 3/16;

    my.fireballAngles = [1];

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

        // Can't walk while shooting
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
        // find a player
        var target = null;

        if (room.players.length == 1) {
            target = room.players[0];
        }
        else {
            target = room.players[Math.floor(Math.random() * room.players.length)];
        }

        // no target no missile
        if (!target) return;


        // find the direct angle
        var xDiff = target.position.x - my.position.x;
        var yDiff = target.position.y - my.position.y;
        var angle = Math.atan2(yDiff, xDiff);

        for (var i = 0; i < my.fireballAngles.length; i++) {
            shootFireball(room, angle * my.fireballAngles[i]);
        }

    };

    var shootFireball = function(room, angle) {
        var missile = Fireball();

        missile.position.x = my.position.x;
        missile.position.y = my.position.y;

        room.addEntity(missile);

        missile.shoot(angle, 3);
    };

    var missilePosition = {};
    missilePosition[Directions.top] = { x: 3, y: -12 };
    missilePosition[Directions.bottom] = { x: 5, y: 11 };
    missilePosition[Directions.left] = { x: -12, y: 5 };
    missilePosition[Directions.right] = { x: 12, y: 5 };

};