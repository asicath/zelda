
var showDebugInfo = false;


var View = (function() {
    var my = {};


    var factor = 0;

    var screen;
    var canvas;



    my.drawRoom = function(room) {

        var start = new Date();

        if (!room.sizedImage) {

            //var start = new Date();

            var virtualWidth = 256;
            var virtualHeight = 176;

            // find the maximum screen size

            factor = Math.min(canvas.width / virtualWidth, canvas.height / virtualHeight);
            screen = {
                width: Math.floor(virtualWidth * factor),
                height: Math.floor(virtualHeight * factor)
            };

            console.log(factor);

            // Create the virtual screen
            var upscaleFactor = Math.ceil(factor); // must be integer
            var buffer = document.createElement('canvas');
            buffer.width = virtualWidth * upscaleFactor;
            buffer.height = virtualHeight * upscaleFactor;
            var ctx = buffer.getContext('2d');

            // draw to the virtual screen
            var palettes = [Palettes.OutsideGreen, Palettes.OutsideBrown, Palettes.OutsideGrey, Palettes.AllBlack];
            var i = 0;
            while (i < room.tiles.length) {
                var t = room.tiles[i];
                drawSprite(ctx, upscaleFactor, room.sprites[t.index], t.x, t.y, palettes[t.palette]);
                i++;
            }

            console.log(new Date() - start);
            var start = new Date();


            // downscale to exact screen size
            var resize = document.createElement('canvas');
            resize.width = screen.width;
            resize.height = screen.height;
            ctx = resize.getContext('2d');
            ctx.drawImage(buffer, 0, 0, screen.width, screen.height);



            room.sizedImage = resize;

            console.log(new Date() - start);
            var start = new Date();
        }



        ctx = canvas.getContext('2d');



        // Center...
        //var container = $(canvas).parent();
        var self = $(canvas);
        var xOffset = Math.abs(screen.width - self.width()) / 2;
        var yOffset = Math.abs(screen.height - self.height()) / 2;

        // Clear top and bottom
        if (yOffset > 0) {
            ctx.clearRect(0,0,canvas.width,Math.ceil(yOffset));
            ctx.clearRect(0, yOffset + screen.height,canvas.width,Math.ceil(yOffset));
        }
        if (xOffset > 0) {
            ctx.clearRect(0,0,Math.ceil(xOffset), canvas.height);
            ctx.clearRect(xOffset + screen.width,0,Math.ceil(xOffset), canvas.height);
        }


        ctx.save();
        ctx.translate(xOffset,yOffset);



        // draw to the real screen
        ctx.drawImage(room.sizedImage, 0, 0);



        // now the entities
        for (var i = room.entities.length-1; i >= 0; i--) {
            drawEntity(ctx, room.entities[i]);
        }




        if (showDebugInfo) {

            renderTime[renderIndex] = new Date() - start;
            renderIndex = (renderIndex + 1) % 60;

            ctx.font = '10pt Calibri';
            ctx.fillStyle = 'white';
            ctx.fillText('frame count:' + frameCount++, 0, 20);
            var max = -1;
            for (var i = 0; i < renderTime.length; i++) {
                if (max < renderTime[i]) max = renderTime[i];
            }

            ctx.fillText('max render time:' + max, 0, 40);


            var link = room.entities[0];
            ctx.fillText('x:' + link.rect.x, 0, 60);
            ctx.fillText('y:' + link.rect.y, 0, 80);

        }


        displayPlayerInfo(ctx, 0, 20);
        displayPlayerInfo(ctx, 1, 160);

        ctx.restore();
    };

    var displayPlayerInfo = function(ctx, playerId, x) {

        drawText(ctx, " player " + (playerId + 1).toString() + " ", x, 4);

        var player = currentRoom.players[playerId];

        if (!player) {

            return;
        }


        drawText(ctx, " killed " + player.monstersKilled.toString() + " ", x, 12);


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
    var drawText = function(ctx, text, x, y) {

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

    var drawEntity = function(ctx, entity) {
        drawSprite(ctx, factor, entity.getSprite(), entity.rect.x, entity.rect.y, entity.getPalette());
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
        while (i < sprite.pixels.length) {

            var p = sprite.pixels[i];

            ctx.fillStyle = p.getColor(palette);
            ctx.fillRect(
                p.x * pixelScale,
                p.y * pixelScale,
                pixelScale,
                pixelScale
            );

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



