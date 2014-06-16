var RupeeBlue = function() {
    var my = Item();

    my.icon.spriteIndex = 0;
    my.icon.palette = Palettes.MonsterBlue;

    my.onPickUp = function(player) {
        // add money

        Sounds.getRupee.play();
    };

    return my;
};
