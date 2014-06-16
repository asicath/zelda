var Bomb = function() {
    var my = Item();

    my.icon.spriteIndex = 1;
    my.icon.palette = Palettes.MonsterBlue;

    my.onPickUp = function(player) {
        // add a bomb

        sound_getItem.play();
    };

    return my;
};
