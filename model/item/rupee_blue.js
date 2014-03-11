var RupeeBlue = function() {
    var my = Item();

    my.spriteIndex = 0;
    my.palette = Palettes.MonsterBlue;

    my.onPickUp = function(player) {
        // add money

        sound_getRupee.play();
    };

    return my;
};
