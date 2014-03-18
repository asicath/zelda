var SwordRain = function(actor) {
    var my = Action(actor);

    var frame = 0;
    var stage = 0;
    var swords = null;

    my.executeAction = function(room) {

        // waiting to start
        if (stage == 0) {
            if (my.activateIntent) {
                // start charging
                stage = 1;
                swords = [];
                frame = 0;
                // prevent movement while charging
                actor.canWalk = false;
                actor.canChangeFace = false;
            }
        }

        // charging
        if (stage == 1) {

            frame++;


            if (frame % 20 == 0) {
                var i = Math.floor(frame / 20) - 1;
                if (i < 5) {
                    createSword(i, room);
                }
            }

            if (!my.activateIntent) {
                // let fly
                for (var i = 0; i < swords.length; i++) {
                    swords[i].launch();
                }
                if (swords.length > 0) {
                    sound_swordForce.play();
                }


                // allow move again
                actor.canWalk = true;
                actor.canChangeFace = true;

                stage = 2;
            }

        }

        // wait to release button
        if (stage == 2) {
            if (!my.activateIntent) {
                stage = 0;
            }
        }

    };


    var createSword = function(i,room) {
        var pos = swordPosition[actor.facing];

        var p = pos.positions[i];

        var sword = SwordMissile(actor, null);

        sword.rect.x = actor.rect.x + p.x;
        sword.rect.y = actor.rect.y + p.y;
        sword.rect.width = pos.width;
        sword.rect.height = pos.height;
        sword.icon.spriteIndex = pos.spriteIndex;
        sword.setFacing(actor.facing);

        swords.push(sword);

        room.addEntity(sword);
        sound_candle.play();
    };


    var swordPosition = {};

    swordPosition[Directions.top] = {
        positions: [
            {x: 4, y: -18},
            {x: 14, y: -10},
            {x: -6, y: -10},
            {x: 24, y: -2},
            {x: -16, y: -2}

        ],
        height: 16,
        width: 8,
        spriteIndex: 0
    };

    swordPosition[Directions.bottom] = {
        positions: [
            {x: 4, y: 17},
            {x: 14, y: 9},
            {x: -6, y: 9},
            {x: 24, y: 1},
            {x: -16, y: 1}
        ],
        height: 16,
        width: 8,
        spriteIndex: 1
    };

    swordPosition[Directions.left] = {
        positions: [
            {x: -16, y: 5},
            {x: -8, y: 15},
            {x: -8, y: -5},
            {x:  0, y: 25},
            {x:  0, y: -15}

        ],
        height: 8,
        width: 16,
        spriteIndex: 2
    };

    swordPosition[Directions.right] = {
        positions: [
            {x: 16, y: 5},
            {x: 8, y: 15},
            {x: 8, y: -5},
            {x: 0, y: 25},
            {x: 0, y: -15}
        ],
        height: 8,
        width: 16,
        spriteIndex: 3
    };

    return my;
};