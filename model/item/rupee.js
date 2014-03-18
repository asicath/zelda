var Rupee = function() {
    var my = Item();

    my.icon.spriteIndex = 0;
    my.icon.palette = Palettes.MonsterRed;

    // blinks every 8 frames
    my.icon.flashing = true;
    my.icon.flashInterval = 8;
    my.icon.flashPalates = [
        Palettes.MonsterBlue,
        Palettes.MonsterRed
    ];

    my.onPickUp = function(player) {
        // add money

        sound_getRupee.play();
    };

    return my;
};
