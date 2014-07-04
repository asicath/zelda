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
            return Icon.flashPalettes[Math.floor((flashIndex++ / flashInterval) % Icon.flashPalettes.length)] || my.imageOptions;
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
        flashIndex = 0;
        if (interval) flashInterval = interval;
    };

    my.stopFlashing = function() {
        flashing = false;
    };

    if (!Icon.flashPalettes) {

        var colorMap = {
            "29": ["0D", "02", "06", "29"], // Link green
            "27": ["1C", "32", "27", "27"], // Link Skin
            "17": ["08", "30", "30", "17"], // Link Highlight

            "06": ["0D", "02", "06", "29"], // Monster Red
            "30": ["08", "30", "30", "17"], // Monster White

            "": []
        };


        Icon.flashPalettes = [
            ImageOptions('flash0'),
            ImageOptions('flash1'),
            ImageOptions('flash2'),
            ImageOptions('flash3')
        ];

        for (var c in colorMap) {
            for (var i = 0; i < 4; i++) {
                Icon.flashPalettes[i].addColorSwap(c, colorMap[c][i]);
            }
        }


    }


    my.imageOptions = null;

    my.drawIcon = function(ctx) {
        if (my.isVisible()) {



            var img = my.getSprite().getImage(my.getPalette());
            ctx.drawImage(img, Math.floor(my.getXPosition()), Math.floor(my.getYPosition()));
        }

    };

    return my;
};

