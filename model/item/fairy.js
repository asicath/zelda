var Fairy = function() {
    var my = Item();

    my.sprites = Sprites.fairy;
    my.spriteIndex = 0;
    my.palette = Palettes.MonsterRed;

    my.onPickUp = function(player) {
        // add a bomb

        sound_getItem.play();
    };

    return my;
};
