(function() {

    View.drawSprite = function(ctx, sprite, x, y, palette) {

        var pixelScale = 1;

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

})();

