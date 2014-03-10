


var Entity = function() {

    var my = {
        palette: null,
        sprites: null,
        spriteIndex: 0,
        rect: null,
        drawOffset: {x: 0, y: 0}
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
            return my.flashPalates[Math.floor((flashIndex++ / 2) % 4)];
        }

        return my.palette;
    };



    my.flashPalates = [
        Palettes.MonsterBlack, // should be all blue
        Palettes.MonsterBlue,
        Palettes.MonsterRed,
        Palettes.LinkGreen
    ];

    my.flashing = false;
    var flashIndex = 0;

    return my;
};