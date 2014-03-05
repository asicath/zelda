var Death = function(entity) {
    var my = Entity();

    my.rect = entity.rect;

    my.sprites = Sprites.deathstar;
    my.spriteIndex = 0;
    my.palette = Palettes.MonsterRed;

    my.entityType = "death";

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

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

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
            // animation is complete, remove from room
            room.removeAfterFrame.push(my);
        }

        deathFrame++;

    };

    return my;
};