var Heart = function() {
    var my = Item();

    my.icon.spriteIndex = 2;
    my.icon.palette = Palettes.MonsterRed;

    // blinks every 8 frames
    my.icon.flashing = true;
    my.icon.flashInterval = 8;
    my.icon.flashPalates = [
        Palettes.MonsterBlue,
        Palettes.MonsterRed
    ];

    my.onPickUp = function(player) {
        var amount = 4;
        if (player.maxLife - player.life < amount) {
            amount = player.maxLife - player.life;
        }
        player.life += amount;

        Sounds.getHeart.play();
    };

    return my;
};
