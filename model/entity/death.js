var Death = function(entity, after) {
    var my = Entity();

    my.entityType = "death";
    my.position = entity.position;

    my.icon.sprites = Sprites.deathstar;
    my.icon.spriteIndex = 0;
    my.icon.palette = Palettes.MonsterRed;



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
            case 0: my.icon.palette = Palettes.DeathStarRedBlue; break;
            case 2: my.icon.palette = Palettes.DeathStarWhiteGold; break;
            case 4: my.icon.palette = Palettes.DeathStarWhiteBlue; break;
            case 6: my.icon.palette = Palettes.DeathStarRedGold; break;
            case 8: my.icon.palette = Palettes.DeathStarRedBlue; break;
            case 10: my.icon.palette = Palettes.DeathStarWhiteGold; break;
            case 12: my.icon.palette = Palettes.DeathStarWhiteBlue; break;
            case 14: my.icon.palette = Palettes.DeathStarRedGold; break;
            case 16: my.icon.palette = Palettes.DeathStarRedBlue; break;
            case 18: my.icon.palette = Palettes.DeathStarWhiteGold; break;
        }


        if (deathFrame <= 0) {
            my.icon.spriteIndex = 0;
        }
        else if (deathFrame <= 6) {
            my.icon.spriteIndex = 2;
        }
        else if (deathFrame <= 12) {
            my.icon.spriteIndex = 1;
        }
        else if (deathFrame <= 18) {
            my.icon.spriteIndex = 2;
        }
        else {
            // animation is complete, remove from room
            room.removeEntity(my);

            if (after) after();
        }

        deathFrame++;

    };

    return my;
};