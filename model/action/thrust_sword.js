var ThrustSword = function(actor) {
    var my = Action(actor);

    var sword = null;          // Sword
    var missile = null;
    var swordState = 0; // 0 = ready, 1 = activate, 2 = in progress, 3 = waiting to let go
    var attackActivateFrames = 0;
    var snd = new Audio("assets/sounds/sword.wav");
    var coolDown = 0;


    // Override sprite if thrusting sword
    var getSprite_parent = actor.getSprite;
    actor.getSprite = function() {
        if (swordState == 1 || swordState == 2) {
            return actor.sprites[actor.spriteIndex + swordStance];
        }
        return getSprite_parent();
    };

    my.executeAction = function(room) {

        // 14 frames to complete sword thrust
        // 14 - Take sword stance
        // 10 - Sword goes all the way out
        // 02 - Relax stance, sword moves back slightly
        // 01 - Sword moves back, tip showing. foot change.
        // 00 - Sword gone.

        if (coolDown) {
            coolDown--;
        }

        // waiting for attack signal
        if (swordState == 0) {
            // check player input
            if (my.activateIntent && coolDown == 0) {
                // attack indicated, move to next state
                swordState = 1;

                // wait 4 frames
                attackActivateFrames = 4;

                // can't move while attacking
                actor.canWalk = false;

                snd.play();
            }

        }

        // Waiting for sword to come out
        if (swordState == 1) {
            // count down to actual sword thrust
            if (attackActivateFrames-- == 0) {

                // create the sword
                sword = Sword(actor.playerId);
                room.entities.push(sword);
                swordTick = 0;

                // indicate that a missile should get created
                createMissile = true;


                // next state
                swordState = 2;
            }
        }

        // waiting for sword to retract
        if (swordState == 2) {

            executeSwordFrame(room);

            if (sword.done) {
                sword = null;
                actor.canWalk = true;

                swordState = 3;
                coolDown = 6;
            }

        }

        // wait for player to not be pressing the attack button
        if (swordState == 3) {
            actor.resetStep();
            if (!my.activateIntent) {
                swordState = 0;
            }
        }


    };

    var createMissile = false;


    var swordTick;
    var slow = 1;
    var swordStance = 0;

    var executeSwordFrame = function(room) {
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

        swordTick++;

        // ensure correct position
        var pos = swordPosition[actor.facing];

        var updateSword = function(rect, pos, name) {
            sword.rect.x = actor.rect.x + pos[name].x;
            sword.rect.y = actor.rect.y + pos[name].y;
            sword.rect.width = pos.width;
            sword.rect.height = pos.height;
            sword.spriteIndex = pos.spriteIndex;
            sword.facing = actor.facing;
        };

        if (swordTick < 9 * slow) {
            swordStance = 2;
            updateSword(actor.rect, pos, "full");
        }
        else if (swordTick < 10 * slow) {
            swordStance = 1;
            updateSword(actor.rect, pos, "mid");

            if (createMissile) {
                attemptCreateMissile(room);
                createMissile = false;
            }
        }
        else if (swordTick < 11 * slow) {
            swordStance = 0;
            updateSword(actor.rect, pos, "back");
        }
        else {
            // Remove sword from room
            room.removeAfterFrame.push(sword);
            sword.done = true;
        }

    };

    var attemptCreateMissile = function(room) {

        if (missile && !missile.complete) {return;}

        // Lets also createa sword missile
        missile = SwordMissile(actor.playerId, sword);
        room.entities.push(missile);
        sound_SwordShoot.play();
    };

    var swordPosition = {};

    swordPosition[Directions.top] = {
        full: {x: 3, y: -12},
        mid:  {x: 3, y: -8},
        back: {x: 3, y: -4},
        height: 16,
        width: 8,
        spriteIndex: 0
    };

    swordPosition[Directions.bottom] = {
        full: {x: 5, y: 11},
        mid:  {x: 5, y: 7},
        back: {x: 5, y: 3},
        height: 16,
        width: 8,
        spriteIndex: 1
    };

    swordPosition[Directions.left] = {
        full: {x: -12, y: 5},
        mid:  {x:  -8, y: 5},
        back: {x:  -4, y: 5},
        height: 8,
        width: 16,
        spriteIndex: 2
    };

    swordPosition[Directions.right] = {
        full: {x: 12, y: 5},
        mid:  {x:  8, y: 5},
        back: {x:  4, y: 5},
        height: 8,
        width: 16,
        spriteIndex: 3
    };

    return my;
};