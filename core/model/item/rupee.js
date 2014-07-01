var Rupee = function() {
    var my = Item();

    my.icon.spriteIndex = 0;

    // blinks every 8 frames
    my.icon.flashing = true;
    my.icon.flashInterval = 8;
    /*
    my.icon.flashPalates = [
        Palettes.MonsterBlue,
        Palettes.MonsterRed
    ];
    */

    my.onPickUp = function(player) {
        // add money
        player.rupees = (player.rupees || 0) + 1;

        Sounds.getRupee.play();


    };

    return my;
};
