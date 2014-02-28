var Player = function() {
    var my = Mover();

    my.playerId = 0;

    my.movementSources.push(new WalkControlled(my));
    my.movementSources.push(new Push(my));

    my.wallSensitive = true;
    my.entityType = 'player';
    my.rect = new Rect(144, 80, 16, 16);
    my.footPrint = new Rect(0, 8, 16, 8); // has a smaller foot print than the monsters
    my.facingSpriteBaseIndex = [0, 3, 6, 9];
    my.sprites = Sprites.link;
    my.spriteIndex = 0;
    my.palette = Palettes.LinkGreen;
    my.speed = 80/60; // can move 80 pixels in 1s or 60 frames

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

        if (my.invincible > 0) {
            my.invincible--;
        }

        executeFrame_parent(room);

        checkInput(my.playerId);

        checkSwordThrust(room);
    };

    var checkInput = function(id) {

        if (playerInput[id].attack) {
            my.attack = true;
        }
        else {
            my.attack = false;
        }

        if (playerInput[id].flash) {
            my.flashing = true;
        }
        else if (my.flashing) {
            my.flashing = false;
        }

    };

    var getSprite_parent = my.getSprite;
    my.getSprite = function() {
        if (swordState == 1 || swordState == 2) {
            return my.sprites[my.spriteIndex + swordStance];
        }
        return getSprite_parent();
    };

    my.getHitZone = function() {
        return new Rect(my.rect.x + 7, my.rect.y + 7, 2, 2);
    };


    my.life = 12;
    my.invincible = 0;
    my.takeDamage = function(amount, facing, room) {

        if (my.invincible > 0) return;

        //my.life -= amount;

        my.invincible = 30;

        if (my.life <= 0) {
            //death(room);
        }
        else {
            takeHit(facing);
        }

    };

    var takeHit = function(facing) {
        // slide 32 pixels in 46 frames
        my.push(Directions.top, 32, 32/8);
        sound_hit.play();
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
            if (my.attack && coolDown == 0) {
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
            else {
                // check for intersection
                var a = room.getIntersectingEntities(sword);
                for (var i = a.length-1; i >= 0; i--) {
                    if (a[i].entityType == 'monster') {
                        a[i].takeDamage(4, my.facing, room);
                    }
                }
            }

        }

        // wait for player to not be pressing the attack button
        if (swordState == 3) {
            my.resetStep();
            if (!my.attack) {
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