


var Entity = function() {

    var my = {
        palette: null,
        sprites: null,
        spriteIndex: 0,
        rect: null
    };

    my.executeFrame = function(room) {

    };

    my.afterFrame = function(room) {

    };

    my.getSprite = function() {
        return my.sprites[my.spriteIndex];
    };

    my.getPalette = function() {

        if (my.flashing) {
            return flashPalates[Math.floor((flashIndex++ / 2) % 4)];
        }

        return my.palette;
    };



    var flashPalates = [
        Palettes.MonsterBlack, // should be all blue
        Palettes.MonsterBlue,
        Palettes.MonsterRed,
        Palettes.LinkGreen
    ];

    my.flashing = false;
    var flashIndex = 0;

    return my;
};