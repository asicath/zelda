define(['core/model/action/action','./flame_sword', './flaming_missile', 'core/controller/sound'], function(Action, FlameSword, FlamingMissile, Sound) {

    var swordSound = Sound('core/assets/sounds/sword.wav');
    var flamingSwordSound = Sound('chains/weapons/flamesword/fire_sword.mp3');

    return function (actor) {
        var my = Action(actor);

        var sword = null;
        my.isMain = true; //?

        var canShoot = false;

        my.onActivate = function () {

            // can't move while attacking
            //actor.freeze();
            actor.shieldUp = false;

            // start thrust sound
            swordSound.play();

            // count down to actual sword thrust
            // Waiting for sword to come out
            actor.setFrameTimeout(4, createSwordEntity);

            canShoot = false;

        };

        var createSwordEntity = function () {

            // create the sword
            sword = FlameSword(actor);
            actor.room.addEntity(sword);

            // all the way out
            sword.extend = "full";
            updateSwordPosition();

        };

        my.onHold = function (frame) {

            if (sword) {
                updateSwordPosition();

                if (!sword.stillOut) {
                    return;
                }

                if (frame == 50) {
                    sword.flameOn();
                    canShoot = true;
                }
            }




        };

        var shootMissile = function () {



            var missile = FlamingMissile(actor);

            missile.position.x = sword.position.x;
            missile.position.y = sword.position.y;
            missile.facing = actor.facing;

            actor.room.addEntity(missile);

            var angle = 0;

            switch (actor.facing) {
                case Directions.right:
                    angle = 0;
                    missile.position.y -= 2;
                    break;
                case Directions.bottom:
                    missile.position.x -= 2;
                    angle = Math.PI / 2;
                    break;
                case Directions.left:
                    angle = Math.PI;
                    missile.position.y -= 2;
                    break;
                case Directions.top:
                    angle = Math.PI / 2 * 3;
                    missile.position.x -= 2;
                    break;
            }

            missile.shoot(angle, 3);

            flamingSwordSound.play();
        };

        my.onDeactivate = function () {

            if (sword.stillOut) {
                if (canShoot) shootMissile();
                actor.room.removeEntity(sword);
            }

            sword = null;
            //actor.unfreeze();
            actor.shieldUp = true;
            actor.resetStep();
        };


        var updateSwordPosition = function () {
            if (!sword) return;

            // ensure correct position
            var pos = swordPosition[actor.facing];

            sword.position.x = actor.position.x + pos[sword.extend].x;
            sword.position.y = actor.position.y + pos[sword.extend].y;
            sword.getFootPrint().setSize(pos.width, pos.height);
            //sword.icon.spriteIndex = pos.spriteIndex;
            sword.facing = actor.facing;
        };

        var swordPosition = {};

        swordPosition[Directions.top] = {
            full: {x: 3, y: -14},
            mid: {x: 3, y: -9},
            back: {x: 3, y: -5},
            height: 18,
            width: 9,
            spriteIndex: 0
        };

        swordPosition[Directions.bottom] = {
            full: {x: 5, y: 13},
            mid: {x: 5, y: 8},
            back: {x: 5, y: 4},
            height: 18,
            width: 9,
            spriteIndex: 2
        };

        swordPosition[Directions.left] = {
            full: {x: -16, y: 5},
            mid: {x: -9, y: 5},
            back: {x: -5, y: 5},
            height: 9,
            width: 18,
            spriteIndex: 4
        };

        swordPosition[Directions.right] = {
            full: {x: 14, y: 5},
            mid: {x: 9, y: 5},
            back: {x: 5, y: 5},
            height: 9,
            width: 18,
            spriteIndex: 6
        };

        return my;
    };

});