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


    my.getPalette = function() {
        if (flashing) {
            var p = flashPalettes[Math.floor((flashIndex++ / flashInterval) % flashPalettes.length)];
            return p || my.imageOptions;
        }
        return my.imageOptions;
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

    var flashing = false;
    var flashInterval = 2;
    var flashIndex = 0;

    my.startFlashing = function(interval) {
        flashing = true;
        if (interval) flashInterval = interval;
    };

    my.stopFlashing = function() {
        flashing = false;
    };

    var flashPalettes =[
        ImageOptions('flashBlack').addColorSwap("29", "0D").addColorSwap("27", "1C").addColorSwap("17", "08"),
        ImageOptions('flashBlue').addColorSwap("29", "02").addColorSwap("27", "32").addColorSwap("17", "30"),
        ImageOptions('flashRed').addColorSwap("29", "06").addColorSwap("27", "27").addColorSwap("17", "30"),
        null
    ];

    my.imageOptions = null;

    my.drawIcon = function(ctx) {
        if (my.isVisible()) {



            var img = my.getSprite().getImage(my.getPalette());
            ctx.drawImage(img, Math.floor(my.getXPosition()), Math.floor(my.getYPosition()));
        }

    };

    return my;
};
