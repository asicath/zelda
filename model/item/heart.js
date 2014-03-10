var Heart = function() {
    var my = Item();

    my.spriteIndex = 2;
    my.palette = Palettes.MonsterRed;

    my.onPickUp = function(player) {
        var amount = 4;
        if (player.maxLife - player.life < amount) {
            amount = player.maxLife - player.life;
        }
        player.life += amount;
    };

    return my;
};
