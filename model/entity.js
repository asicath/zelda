


var Entity = function() {

    var my = {
        palette: null,
        sprites: null,
        spriteIndex: 0,
        rect: null,
        drawOffset: {x: 0, y: 0},
        visible: true
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
            return my.flashPalates[Math.floor((flashIndex++ / my.flashInterval) % my.flashPalates.length)];
        }

        return my.palette;
    };


    // *** FLICKERING ***
    my.flickering = false;
    var flickerFrame = 0;

    my.isVisible = function() {

        if (my.flickering) {
            // flickers invisible in 2 frame intervals
            return flickerFrame++ % 2 == 0;
        }

        return my.visible;
    };

    // *** FLASHING ***
    my.flashPalates = [
        Palettes.MonsterBlack, // should be all blue
        Palettes.MonsterBlue,
        Palettes.MonsterRed,
        Palettes.LinkGreen
    ];

    my.flashing = false;
    my.flashInterval = 2;
    var flashIndex = 0;

    return my;
};