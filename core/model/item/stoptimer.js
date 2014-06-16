var StopTimer = function() {
    var my = Item();

    my.icon.spriteIndex = 3;
    my.icon.palette = Palettes.MonsterRed;

    my.onPickUp = function(player) {

        sound_getItem.play();
    };

    return my;
};
