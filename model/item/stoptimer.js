var StopTimer = function() {
    var my = Item();

    my.spriteIndex = 3;
    my.palette = Palettes.MonsterRed;

    my.onPickUp = function(player) {

        sound_getItem.play();
    };

    return my;
};