var Icon = function(entity, spriteSheet, initialSpriteIndex) {
    var my = {
        spriteSheet: spriteSheet,
        spriteIndex: initialSpriteIndex || 0,
        drawOffset: {x: 0, y: 0},
        visible: true
    };

    var getXPosition = function() {
        return entity.position.x + my.drawOffset.x;
    };

    var getYPosition = function() {
        return entity.position.y + my.drawOffset.y;
    };

    my.getSprite = function() {
        return my.spriteSheet.sprites[my.spriteIndex];
    };

    // Default image options
    my.imageOptions = null;

    my.drawIcon = function(ctx) {
        if (my.isVisible()) {
            var img = my.getSprite().getImage(my.getPalette());
            ctx.drawImage(img, Math.floor(getXPosition()), Math.floor(getYPosition()));
        }
    };


    // *** FLICKERING ***
    var flickering = false;
    var flickerFrame = 0;
    var flickerInterval = 2;

    my.startFlickering = function() {
        flickering = true;
    };

    my.stopFlickering = function() {
        flickering = false;
        flickerFrame = 0;
    };

    my.isVisible = function() {

        if (flickering) {
            // flickers invisible in 2 frame intervals
            return flickerFrame++ % flickerInterval == 0;
        }

        return my.visible;
    };


    // *** FLASHING ***
    var flashing = false;
    var flashInterval = 2;
    var flashIndex = 0;

    my.startFlashing = function(interval) {
        flashing = true;
        if (interval) flashInterval = interval;
    };

    my.stopFlashing = function() {
        flashing = false;
        flashIndex = 0;
    };

    // Setup the flashPalettes
    if (!Icon.defaultFlashPalettes) {

        var colorMap = {
            "29": ["0D", "02", "06", "29"], // Link green
            "27": ["1C", "32", "27", "27"], // Link Skin
            "17": ["08", "30", "30", "17"], // Link Highlight

            "06": ["0D", "02", "06", "29"], // Monster Red
            "30": ["08", "30", "30", "17"], // Monster White

            "": []
        };

        Icon.defaultFlashPalettes = [
            ImageOptions('flash0'),
            ImageOptions('flash1'),
            ImageOptions('flash2'),
            ImageOptions('flash3')
        ];

        for (var c in colorMap) {
            for (var i = 0; i < 4; i++) {
                Icon.defaultFlashPalettes[i].addColorSwap(c, colorMap[c][i]);
            }
        }

    }

    my.flashPalettes = Icon.defaultFlashPalettes;

    my.getPalette = function() {
        if (flashing) {
            return my.flashPalettes[Math.floor((flashIndex++ / flashInterval) % my.flashPalettes.length)] || my.imageOptions;
        }
        return my.imageOptions;
    };

    return my;
};

