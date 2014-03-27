var AimedShooter = function(my) {

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


        shootFireball(room, angle);
        shootFireball(room, angle * 1.1);
        shootFireball(room, angle * 0.9);
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