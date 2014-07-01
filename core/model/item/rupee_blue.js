var RupeeBlue = function() {
    var my = Item();

    my.icon.spriteIndex = 0;

    my.onPickUp = function(player) {
        // add money
        player.rupees = (player.rupees || 0) + 5;

        Sounds.getRupee.play();
    };

    return my;
};
