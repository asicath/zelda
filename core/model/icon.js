var Icon = function(entity, spriteSheet, initialSpriteIndex) {
    var my = {
        spriteSheet: spriteSheet,
        spriteIndex: initialSpriteIndex || 0,
        drawOffset: {x: 0, y: 0},
        visible: true
    };

    my.getXPosition = function() {
        return entity.position.x + my.drawOffset.x;
    };

    my.getYPosition = function() {
        return entity.position.y + my.drawOffset.y;
    };

    my.getSprite = function() {
        return my.spriteSheet.sprites[my.spriteIndex];
    };

    /*
    my.getPalette = function() {
        if (my.flashing) {
            return my.flashPalates[Math.floor((flashIndex++ / my.flashInterval) % my.flashPalates.length)];
        }
        return my.palette;
    };
    */

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

    /*
    // *** FLASHING ***
    my.flashPalates = [
        Palettes.MonsterBlack, // should be all blue
        Palettes.MonsterBlue,
        Palettes.MonsterRed,
        Palettes.LinkGreen
    ];
    */

    var flashing = false;
    var flashInterval = 2;
    var flashIndex = 0;

    my.startFlashing = function(interval) {
        flashing = true;
        flashInterval = interval;
    };

    my.stopFlashing = function() {
        flashing = false;
    };


    my.imageOptions = null;

    my.drawIcon = function(ctx) {
        if (my.isVisible()) {
            var img = my.getSprite().getImage(my.imageOptions);
            ctx.drawImage(img, Math.floor(my.getXPosition()), Math.floor(my.getYPosition()));
        }

    };

    return my;
};
