var Player = function() {
    var my = PlayerWalker();

    var thrustSword;    // bool
    var sword;          // Sword
    var swordMissile;   // SwordMissile
    var swordTick;      // long
    var inThrustStance; // bool

    var swordState = 0; // 0 = ready, 1 = activate, 2 = in progress, 3 = waiting to let go
    var attackActivateFrames = 0;

    // Init sword
    thrustSword = false;
    sword = null;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        // Walker uses input
        executeFrame_parent(room);

        checkSwordThrust(room);

    };

    var getSprite_parent = my.getSprite;
    my.getSprite = function() {
        if (swordState == 1 || swordState == 2) {
            return my.sprites[my.spriteIndex + 2];
        }
        return getSprite_parent();
    };

    var checkSwordThrust = function(room) {

        // 14 frames to complete sword thrust
        // 14 - Take sword stance
        // 10 - Sword goes all the way out
        // 02 - Relax stance, sword moves back slightly
        // 01 - Sword moves back, tip showing. foot change.
        // 00 - Sword gone.

        // waiting for attack signal
        if (swordState == 0) {
            // check player input
            if (playerInput[my.playerId].attack) {
                // attack indicated, move to next state
                swordState = 1;

                // wait 4 frames
                attackActivateFrames = 4;

                // can't move while attacking
                my.canMove = false;
            }

        }

        // Waiting for sword to come out
        else if (swordState == 1) {
            // count down to actual sword thrust
            if (attackActivateFrames-- == 0) {
                // create the sword
                sword = Sword(my.facing, my);
                room.entities.push(sword);
                // next state
                swordState = 2;
            }
        }

        // waiting for sword to retract
        else if (swordState == 2) {

            if (sword.done) {
                sword = null;
                my.canMove = true;

                swordState = 3;
            }

        }

        // wait for player to not be pressing the attack button
        else if (swordState == 3) {
            if (!playerInput[my.playerId].attack) {
                swordState = 0;
            }
        }


    };





    return my;
};