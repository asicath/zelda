
var View = (function() {
    var my = {};

    var screen;

    var canvas;

    my.needsResize = true;

    my.setSize = function(room, maxWidth, maxHeight) {

        // find the maximum screen size
        var factor = Math.min(maxWidth / room.rect.width, maxHeight / room.rect.height);
        screen = {
            width: Math.floor(room.rect.width * factor),
            height: Math.floor(room.rect.height * factor),
            factor: factor
        };

        // find center for later
        screen.xOffset = Math.abs(screen.width - maxWidth) / 2;
        screen.yOffset = Math.abs(screen.height - maxHeight) / 2;

        // Create the virtual screen
        var upscaleFactor = Math.ceil(factor); // must be integer
        var buffer = document.createElement('canvas');
        buffer.width = room.rect.width * upscaleFactor;
        buffer.height = room.rect.height * upscaleFactor;
        var ctxBuffer = buffer.getContext('2d');

        // draw to the virtual screen
        var palettes = [Palettes.OutsideGreen, Palettes.OutsideBrown, Palettes.OutsideGrey, Palettes.AllBlack];
        var i = 0;
        while (i < room.tiles.length) {
            var t = room.tiles[i];
            drawSprite(ctxBuffer, upscaleFactor, room.sprites[t.index], t.x, t.y, palettes[t.palette]);
            i++;
        }

        // downscale to exact screen size
        var resize = document.createElement('canvas');
        resize.width = screen.width;
        resize.height = screen.height;
        ctxBuffer = resize.getContext('2d');
        ctxBuffer.drawImage(buffer, 0, 0, screen.width, screen.height);

        screen.sizedImage = resize;
    };

    my.drawRoom = function(room) {

        if (my.needsResize) {
            my.setSize(room, canvas.width, canvas.height);
            my.needsResize = false;
        }

        var ctx = canvas.getContext('2d');

        // Clear top and bottom
        if (screen.yOffset > 0) {
            ctx.clearRect(0,0,canvas.width,Math.ceil(screen.yOffset));
            ctx.clearRect(0, screen.yOffset + screen.height,canvas.width,Math.ceil(screen.yOffset));
        }
        if (screen.xOffset > 0) {
            ctx.clearRect(0,0,Math.ceil(screen.xOffset), canvas.height);
            ctx.clearRect(screen.xOffset + screen.width,0,Math.ceil(screen.xOffset), canvas.height);
        }


        ctx.save();
        ctx.translate(screen.xOffset,screen.yOffset);


        // draw to the real screen
        ctx.drawImage(screen.sizedImage, 0, 0);


        // now the entities
        for (var i = room.entities.length-1; i >= 0; i--) {
            drawEntity(ctx, room.entities[i], screen.factor);
        }


        // Optional draws
        if (room.wave) {
            drawText(ctx, " wave " + room.wave.toString() + " ", 96, 4, screen.factor);
        }

        if (room.players) {
            displayPlayerInfo(ctx, 0, 4, screen.factor);
            displayPlayerInfo(ctx, 1, 172, screen.factor);
        }


        ctx.restore();
    };

    var displayPlayerInfo = function(ctx, playerId, x, factor) {

        drawText(ctx, " player " + (playerId + 1).toString() + " ", x, 4, factor);

        var player = currentRoom.players[playerId];

        if (!player) {

            return;
        }


        drawText(ctx, " killed " + player.monstersKilled.toString() + " ", x, 12, factor);


        var i = player.maxLife;

        ctx.fillStyle="#000000";
        ctx.fillRect(x * factor, 20 * factor, ((i / 4)+2) * factor * 8, 8 * factor);

        while (i > 0) {
            var index = 0;
            if (i > player.life) {
                if (i - player.life == 2) {
                    index = 1;
                }
                else {
                    index = 2;
                }
            }
            drawSprite(ctx, factor, Sprites.heart[index], x + (i/4)*8, 20, Palettes.DeathStarRedBlue);
            i-=4;
        }


    };

    var renderTime = [];
    var renderIndex = 0;

    var frameCount = 0;

    var textMap = {
        "a": 0,
        "b": 1,
        "c": 2,
        "d": 3,
        "e": 4,
        "f": 5,
        "g": 6,
        "h": 7,
        "i": 8,
        "j": 9,
        "k": 10,
        "l": 11,
        "m": 12,
        "n": 13,
        "o": 14,
        "p": 15,
        "q": 16,
        "r": 17,
        "s": 18,
        "t": 19,
        "u": 20,
        "v": 21,
        "w": 22,
        "x": 23,
        "y": 24,
        "z": 25,

        "-": 26,
        ".": 27,
        ",": 28,
        "!": 29,
        "'": 30,
        "&": 31,
        "?": 32,

        "0": 33,
        "1": 34,
        "2": 35,
        "3": 36,
        "4": 37,
        "5": 38,
        "6": 39,
        "7": 40,
        "8": 41,
        "9": 42
    };
    var drawText = function(ctx, text, x, y, factor) {

        //
        ctx.fillStyle="#000000";
        ctx.fillRect(x * factor, y * factor, text.length * factor * 8, 8 * factor);

        for (var i = 0; i < text.length; i++) {

            var char = textMap[text[i]];
            if (typeof char === "undefined") char = 43;

            var sprite = Sprites.letters[char];
            drawSprite(ctx, factor, sprite, x + i*8, y, Palettes.Text);
        }


    };

    var drawEntity = function(ctx, entity, factor) {
        // todo allow for multiple icons per entity
        drawIcon(ctx, entity.icon, factor);
    };

    var drawIcon = function(ctx, icon, factor) {
        if (icon.isVisible())
            drawSprite(ctx, factor, icon.getSprite(), icon.getXPosition(), icon.getYPosition(), icon.getPalette());
    };

    var drawSprite = function(ctx, pixelScale, sprite, x, y, palette) {

        if (!sprite.cache) sprite.cache = {};

        var key = palette.name + '_' + pixelScale.toString();

        if (!sprite.cache[key]) {
            var pixelScaleUp = Math.ceil(pixelScale);

            if (pixelScale == pixelScaleUp) {
                // direct draw, no need to upscale
                sprite.cache[key] = createSpriteCanvas(pixelScale, sprite, palette);
            }
            else {
                // get the upscaled image
                var upscaleKey = pixelScaleUp.toString();
                sprite.cache[upscaleKey] = createSpriteCanvas(pixelScaleUp, sprite, palette);

                // now downscale
                var img = document.createElement('canvas');
                img.width = Math.ceil(sprite.width * pixelScale);
                img.height = Math.ceil(sprite.height * pixelScale);
                var context = img.getContext('2d');

                context.drawImage(sprite.cache[upscaleKey], 0, 0, sprite.width * pixelScale, sprite.height * pixelScale);

                sprite.cache[key] = img;
            }


        }

        // Draw the cached image
        ctx.drawImage(sprite.cache[key], x * pixelScale, y * pixelScale);

    };


    // Return a canvas object with the sprite rendered to it
    var createSpriteCanvas = function(pixelScale, sprite, palette) {
        var img = document.createElement('canvas');
        img.width = sprite.width * pixelScale;
        img.height = sprite.height * pixelScale;
        var context = img.getContext('2d');

        // do the actual rendering of the pixels
        drawSpriteFromPixels(context, pixelScale, sprite, palette);

        return img;
    };


    // Draw the raw pixels of a sprite to the specified canvas context
    var drawSpriteFromPixels = function(ctx, pixelScale, sprite, palette) {
        var i = 0;
        var c = null;
        while (i < sprite.pixels.length) {

            var p = sprite.pixels[i];

            c = p.getColor(palette);

            if (c != null) {
                ctx.fillStyle = c;
                ctx.fillRect(
                    p.x * pixelScale,
                    p.y * pixelScale,
                    pixelScale,
                    pixelScale
                );
            }

            i++;
        }
    };

    // ensure the canvas is taking up the whole parent
    my.fullscreen = function() {

        canvas = document.getElementById('img');
        var container = $(canvas).parent();
        var c = $(canvas);

        // Set width and height
        if (c.attr('width') != container.width()) { c.attr('width', container.width()); }
        if (c.attr('height') != container.height()) { c.attr('height', container.height()); }
    };

    return my;
})();



