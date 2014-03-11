var Fairy = function() {
    var my = Item();

    my.sprites = Sprites.fairy;
    my.spriteIndex = 0;
    my.palette = Palettes.MonsterRed;

    my.onPickUp = function(player) {
        var amount = 12;
        if (player.maxLife - player.life < amount) {
            amount = player.maxLife - player.life;
        }
        player.life += amount;

        sound_getItem.play();
    };

    return my;
};
