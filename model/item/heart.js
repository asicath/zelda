var Heart = function() {
    var my = Item();

    my.spriteIndex = 2;
    my.palette = Palettes.MonsterRed;

    // blinks every 8 frames
    my.flashing = true;
    my.flashInterval = 8;
    my.flashPalates = [
        Palettes.MonsterBlue,
        Palettes.MonsterRed
    ];

    my.onPickUp = function(player) {
        var amount = 4;
        if (player.maxLife - player.life < amount) {
            amount = player.maxLife - player.life;
        }
        player.life += amount;

        sound_getHeart.play();
    };

    return my;
};
