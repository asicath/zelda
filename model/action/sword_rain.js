var SwordRain = function(actor) {
    var my = Action(actor);

    var frame = 0;

    my.executeAction = function(room) {

        if (frame == 0 && my.activateIntent) {
            frame = 60;
        }

        if (frame > 0) {
            executeFrame(room);
        }

    };

    var swords = null;

    var executeFrame = function(room) {


        if (frame == 60) {
            swords = [];

            var pos = swordPosition[actor.facing];

            for (var i = 0; i < pos.positions.length; i++) {

                var p = pos.positions[i];

                var sword = SwordMissile(actor.playerId, null);

                sword.rect.x = actor.rect.x + p.x;
                sword.rect.y = actor.rect.y + p.y;
                sword.rect.width = pos.width;
                sword.rect.height = pos.height;
                sword.spriteIndex = pos.spriteIndex;
                sword.setFacing(actor.facing);

                swords.push(sword);
            }

        }

        if (frame <= 50) {
            for (var i = 0; i < swords.length; i++) {
                if (frame == 50 - i * 7) {
                    room.entities.push(swords[i]);
                    sound_candle.play();
                }


            }
        }


        if (frame == 20) {
            for (var i = 0; i < swords.length; i++) {
                swords[i].launch();
            }
            sound_SwordShoot.play();
        }

        frame--;
    };



    var swordPosition = {};

    swordPosition[Directions.top] = {
        positions: [ {x: 4, y: -18} ],
        height: 16,
        width: 8,
        spriteIndex: 0
    };

    swordPosition[Directions.bottom] = {
        positions: [ {x: 4, y: 17} ],
        height: 16,
        width: 8,
        spriteIndex: 1
    };

    swordPosition[Directions.left] = {
        positions: [
            {x: -16, y: 5},
            {x: -8, y: 15},
            {x: -8, y: -5},
            {x: -0, y: 25},
            {x: -0, y: -15}

        ],
        height: 8,
        width: 16,
        spriteIndex: 2
    };

    swordPosition[Directions.right] = {
        positions: [ {x: 16, y: 5} ],
        height: 8,
        width: 16,
        spriteIndex: 3
    };

    return my;
};