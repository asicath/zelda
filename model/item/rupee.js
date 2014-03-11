var Rupee = function() {
    var my = Item();

    my.spriteIndex = 0;
    my.palette = Palettes.MonsterRed;

    // blinks every 8 frames
    my.flashing = true;
    my.flashInterval = 8;
    my.flashPalates = [
        Palettes.MonsterBlue,
        Palettes.MonsterRed
    ];

    my.onPickUp = function(player) {
        // add money

        sound_getRupee.play();
    };

    return my;
};
