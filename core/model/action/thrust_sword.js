// 14 ticks to complete sword thrust
// 14 - Take sword stance
// 10 - Sword goes all the way out
// 02 - Relax stance, sword moves back slightly
// 01 - Sword moves back, tip showing. foot change.
// 00 - Sword gone.

// 10 frames to complete sword thrust
// 1,2,3,4,5,6,7,8 - Sword is all the way out, in thrust stance
// 9               - Sword moves back slightly, relax stance
// 10 - Sword moves back, tip showing. foot change.
// 11 - Sword gone.

define(['./action', '../entity/sword_missile', '../entity/sword', 'core/model/directives', 'core/controller/sound'], function(Action, SwordMissile, Sword, Directives, Sound) {

    var swordSound = Sound('core/assets/sounds/sword.wav');
    var swordShootSound = Sound('core/assets/sounds/sword_shoot.wav');

    return function (actor) {
        var my = Action(actor);

        var sword = null;          // Sword
        var missile = null;
        var swordState = 0; // 0 = ready, 1 = activate, 2 = in progress, 3 = waiting to let go
        var coolingDown = false;
        var createMissile = false;
        var swordStance = 0;

        my.isMain = true;

        // Override sprite if thrusting sword
        var getSprite_parent = actor.icon.getSprite;
        actor.icon.getSprite = function () {
            if (swordState == 1 || swordState == 2) {
                return actor.icon.spriteSheet.sprites[actor.icon.spriteIndex + swordStance];
            }
            return getSprite_parent();
        };

        my.executeFrame = function () {

            // 14 frames to complete sword thrust
            // 14 - Take sword stance
            // 10 - Sword goes all the way out
            // 02 - Relax stance, sword moves back slightly
            // 01 - Sword moves back, tip showing. foot change.
            // 00 - Sword gone.

            // waiting for attack signal
            if (swordState == 0 && my.activateIntent && !coolingDown) {
                startThrust();
            }

            // waiting for sword to retract
            if (swordState == 2) {
                updateSwordPosition();
            }

            // wait for player to not be pressing the attack button
            if (swordState == 3 && !my.activateIntent) {
                swordState = 0;
            }


        };

        var startThrust = function () {
            // attack indicated, move to next state
            swordState = 1;

            // can't move while attacking
            actor.freeze();
            actor.shieldUp = false;

            // start thrust sound
            swordSound.play();

            // count down to actual sword thrust
            // Waiting for sword to come out
            actor.setFrameTimeout(4, createSwordEntity);

            Directives.nextMessage(2);
        };

        var createSwordEntity = function () {

            // create the sword
            sword = Sword(actor);
            actor.room.addEntity(sword);

            // indicate that a missile should get created
            createMissile = true;

            // next state
            swordState = 2;

            // all the way out
            swordStance = 2;
            sword.extend = "full";
            updateSwordPosition();

            var slow = 1;

            actor.setFrameTimeout(9 * slow, function () {
                swordStance = 1;
                sword.extend = "mid";
                if (actor.life == actor.maxLife && createMissile) {
                    attemptCreateMissile();
                    createMissile = false;
                }
            });

            actor.setFrameTimeout(10 * slow, function () {
                swordStance = 0;
                sword.extend = "back";
            });

            actor.setFrameTimeout(11 * slow, function () {
                // Remove sword from room
                actor.room.removeEntity(sword);
                thrustCleanUp();
            });
        };

        var thrustCleanUp = function () {
            sword = null;
            actor.unfreeze();
            actor.shieldUp = true;
            actor.resetStep();

            swordState = 3;

            coolingDown = true;
            actor.setFrameTimeout(6, function () {
                coolingDown = false;
            });
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

        var attemptCreateMissile = function () {

            if (missile && !missile.complete) {
                return;
            }

            // Lets also createa sword missile
            missile = SwordMissile(actor, sword);
            actor.room.addEntity(missile);
            missile.launch();
            swordShootSound.play();
        };

        var swordPosition = {};

        swordPosition[Directions.top] = {
            full: {x: 3, y: -12},
            mid: {x: 3, y: -8},
            back: {x: 3, y: -4},
            height: 16,
            width: 8,
            spriteIndex: 0
        };

        swordPosition[Directions.bottom] = {
            full: {x: 5, y: 11},
            mid: {x: 5, y: 7},
            back: {x: 5, y: 3},
            height: 16,
            width: 8,
            spriteIndex: 1
        };

        swordPosition[Directions.left] = {
            full: {x: -12, y: 5},
            mid: {x: -8, y: 5},
            back: {x: -4, y: 5},
            height: 8,
            width: 16,
            spriteIndex: 2
        };

        swordPosition[Directions.right] = {
            full: {x: 12, y: 5},
            mid: {x: 8, y: 5},
            back: {x: 4, y: 5},
            height: 8,
            width: 16,
            spriteIndex: 3
        };

        return my;
    };
});