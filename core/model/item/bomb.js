var Bomb = function() {
    var my = Item();

    my.icon.spriteIndex = 1;

    my.onPickUp = function(player) {
        // add a bomb
        player.bombs = (player.bombs || 0) + 1;

        Sounds.getItem.play();
    };

    return my;
};
