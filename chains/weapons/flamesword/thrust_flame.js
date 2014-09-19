define(['core/model/action/action','./flame_sword'], function(Action, FlameSword) {

    return function (actor) {
        var my = Action(actor);

        var sword = null;
        my.isMain = true; //?

        my.onActivate = function () {

            // can't move while attacking
            actor.freeze();
            actor.shieldUp = false;

            // start thrust sound
            Sounds.sword.play();

            // count down to actual sword thrust
            // Waiting for sword to come out
            actor.setFrameTimeout(4, createSwordEntity);

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
            }

        };

        my.onDeactivate = function () {

            actor.room.removeEntity(sword);

            sword = null;
            actor.unfreeze();
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
            sword.icon.spriteIndex = pos.spriteIndex;
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