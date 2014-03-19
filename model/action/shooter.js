var Shooter = function(my) {

    my.shootPercent = 3/16;
    var framesUntilCheck = 16;
    var shooting = false;
    var shootFrame = 0;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        if (!shooting) checkShoot(room);
        if (shooting) executeShootFrame(room);

        executeFrame_parent(room);
    };

    var checkShoot = function(room) {
        if (--framesUntilCheck > 0) return;

        if (Math.random() < my.shootPercent) shoot();

        framesUntilCheck = 16;
    };

    var shoot = function() {
        shooting = true;
        shootFrame = 0;
    };

    var executeShootFrame = function(room) {
        if (shootFrame == 0) {
            my.canWalk = false;
        }
        else if (shootFrame == 34) {
            // create rock
            createMissile(room);
        }
        else if (shootFrame == 49) {
            my.canWalk = true;
            shooting = false;
        }

        shootFrame++;
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