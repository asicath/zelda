define(['./action', '../entity/sword_missile', 'core/controller/sound'], function(Action, SwordMissile, Sound) {

    var candleSound = Sound('core/assets/sounds/candle.wav');
    var swordForceSound = Sound('core/assets/sounds/Swrd Brst Full 2.mp3');

    return function (actor) {
        var my = Action(actor);

        var swords = null;
        my.weaponIconIndex = 3;

        my.onActivate = function () {
            // clear swords for new charging
            swords = [];

            // prevent movement while charging
            actor.freeze();
            actor.canChangeFace = false;
        };

        my.onHold = function (frame) {
            if (frame % 20 == 0) {
                var i = Math.floor(frame / 20) - 1;
                if (i < 5) {
                    createSword(i);
                }
            }
        };

        my.onDeactivate = function () {

            // let fly
            for (var i = 0; i < swords.length; i++) {
                swords[i].launch();
            }

            // Play a sound if there were swords
            if (swords.length > 0) {
                swordForceSound.play();
            }

            // allow move again
            actor.unfreeze();
            actor.canChangeFace = true;
        };

        var createSword = function (i) {
            var pos = swordPosition[actor.facing];

            var p = pos.positions[i];

            var sword = SwordMissile(actor, null);

            sword.position.x = actor.position.x + p.x;
            sword.position.y = actor.position.y + p.y;

            sword.getFootPrint().setSize(pos.width, pos.height);

            sword.icon.spriteIndex = pos.spriteIndex;
            sword.setFacing(actor.facing);

            swords.push(sword);

            actor.room.addEntity(sword);
            candleSound.play();
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
                {x: 0, y: 25},
                {x: 0, y: -15}

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
});