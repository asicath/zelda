var Player = function() {
    var my = PlayerWalker();

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        // Walker uses input
        executeFrame_parent(room);

        checkSwordThrust(room);
    };

    var getSprite_parent = my.getSprite;
    my.getSprite = function() {
        if (swordState == 1 || swordState == 2) {
            return my.sprites[my.spriteIndex + swordStance];
        }
        return getSprite_parent();
    };





    var sword = null;          // Sword
    var swordState = 0; // 0 = ready, 1 = activate, 2 = in progress, 3 = waiting to let go
    var attackActivateFrames = 0;
    var snd = new Audio("assets/sounds/sword.wav");
    var coolDown = 0;

    var checkSwordThrust = function(room) {

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
            if (playerInput[my.playerId].attack && coolDown == 0) {
                // attack indicated, move to next state
                swordState = 1;

                // wait 4 frames
                attackActivateFrames = 4;

                // can't move while attacking
                my.canMove = false;

                snd.play();
            }

        }

        // Waiting for sword to come out
        if (swordState == 1) {
            // count down to actual sword thrust
            if (attackActivateFrames-- == 0) {

                // create the sword
                sword = Sword();
                room.entities.push(sword);
                swordTick = 0;

                // next state
                swordState = 2;
            }
        }

        // waiting for sword to retract
        if (swordState == 2) {

            executeSwordFrame(room);

            if (sword.done) {
                sword = null;
                my.canMove = true;

                swordState = 3;
                coolDown = 6;
            }

        }

        // wait for player to not be pressing the attack button
        if (swordState == 3) {
            my.resetStep();
            if (!playerInput[my.playerId].attack) {
                swordState = 0;
            }
        }


    };


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
        var pos = swordPosition[my.facing];

        var updateSword = function(rect, pos, name) {
            sword.rect.x = my.rect.x + pos[name].x;
            sword.rect.y = my.rect.y + pos[name].y;
            sword.rect.width = pos.width;
            sword.rect.height = pos.height;
            sword.spriteIndex = pos.spriteIndex;
        };

        if (swordTick < 9 * slow) {
            swordStance = 2;
            updateSword(my.rect, pos, "full");
        }
        else if (swordTick < 10 * slow) {
            swordStance = 1;
            updateSword(my.rect, pos, "mid");
        }
        else if (swordTick < 11 * slow) {
            swordStance = 0;
            updateSword(my.rect, pos, "back");
        }
        else {
            // Remove sword from room
            room.removeAfterFrame.push(sword);
            sword.done = true;
        }

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