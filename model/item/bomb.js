var Bomb = function() {
    var my = Item();

    my.spriteIndex = 1;
    my.palette = Palettes.MonsterBlue;

    my.onPickUp = function(player) {
        // add a bomb
    };

    return my;
};
