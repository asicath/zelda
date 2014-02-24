var Monster = function() {
    var my = RandomWalker();

    my.entityType = 'monster';
    my.life = 4;
    my.invincible = 0;

    my.sprites = Sprites.octopus;
    my.spriteIndex = 0;
    my.palette = Palettes.MonsterRed;


    my.takeDamage = function(amount, facing, room) {

        if (my.invincible > 0) return;

        my.life -= amount;

        my.invincible = 30;

        if (my.life <= 0) {
            death(room);
        }
        else {
            takeHit(facing);
        }

    };

    var death = function(room) {
        my.isDead = true;

        my.spriteIndex = 0;
        my.sprites = Sprites.deathstar;

        my.getSprite = function() {
            return my.sprites[my.spriteIndex];
        };

        my.invincible = 1000;

        playSoundKill();
        monstersKilled++;
    };

    var takeHit = function(facing) {
        my.push(facing, 128, 2);
        sound_hit.play();
    };

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

        if (my.isDead) {
            executeDeathFrame(room);
            return;
        }

        executeFrame_parent(room);
        if (my.invincible > 0) {
            my.invincible--;
        }

    };



    /* Death animation
    19 frames
    0 blank
    1-6 small
    7-12 large
    13-18 small

     DeathStarRedBlue
     DeathStarWhiteGold
     DeathStarWhiteBlue
     DeathStarRedGold

    0 redblue
    2 whitegold
    4 white blue
    6 redgold
    8 redblue
    10 whitegold
    12 whiteblue
    14 redgold
    16 redblue
    18 whitegold
    */

    my.isDead = false;
    var deathFrame = 0;

    var executeDeathFrame = function(room) {

        switch (deathFrame) {
            case 0: my.palette = Palettes.DeathStarRedBlue; break;
            case 2: my.palette = Palettes.DeathStarWhiteGold; break;
            case 4: my.palette = Palettes.DeathStarWhiteBlue; break;
            case 6: my.palette = Palettes.DeathStarRedGold; break;
            case 8: my.palette = Palettes.DeathStarRedBlue; break;
            case 10: my.palette = Palettes.DeathStarWhiteGold; break;
            case 12: my.palette = Palettes.DeathStarWhiteBlue; break;
            case 14: my.palette = Palettes.DeathStarRedGold; break;
            case 16: my.palette = Palettes.DeathStarRedBlue; break;
            case 18: my.palette = Palettes.DeathStarWhiteGold; break;
        }


        if (deathFrame <= 0) {
            my.spriteIndex = 0;
        }
        else if (deathFrame <= 6) {
            my.spriteIndex = 2;
        }
        else if (deathFrame <= 12) {
            my.spriteIndex = 1;
        }
        else if (deathFrame <= 18) {
            my.spriteIndex = 2;
        }
        else {
            room.removeAfterFrame.push(my);
            room.countToAddMonster = 30;
            room.addCount += 2;
        }

        deathFrame++;

    };

    return my;
};




