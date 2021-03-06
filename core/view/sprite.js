define(function() {
    return function (width, height) {

        var exports = {
            width: width,
            height: height,
            pixels: []
        };

        exports.getPixel = function (x, y) {
            if (x < 0 || x >= exports.width) {
                return null;
            }
            if (y < 0 || y >= exports.height) {
                return null;
            }

            var i = x + y * exports.width;
            return exports.pixels[i];
        };

        exports.drawSprite = function (ctx, x, y) {
            var img = exports.getImage();

            // Draw the cached image
            ctx.drawImage(img, x, y);
        };

        var imageCache = {};

        // Return a canvas object with the sprite rendered to it
        exports.getImage = function (options) {

            if (!options) options = {key: 'natural'};

            // create the image if it doesn't exist in the cache already
            if (!imageCache[options.key]) {
                var img = document.createElement('canvas');
                img.width = exports.width;
                img.height = exports.height;
                var context = img.getContext('2d');

                // do the actual rendering of the pixels
                drawSpriteFromPixels(context, options.colorSwaps);

                imageCache[options.key] = img;
            }

            // return from the cache
            return imageCache[options.key];
        };

        // Draw the raw pixels of a sprite to the specified canvas context
        var drawSpriteFromPixels = function (ctx, colorSwaps) {
            var i = 0, j;
            var c = null;

            while (i < exports.pixels.length) {

                var p = exports.pixels[i];

                // default color
                c = p.color;

                if (colorSwaps) {
                    // determine if we are swapping this color out
                    for (j = 0; j < colorSwaps.length; j++) {
                        if (c.equals(colorSwaps[j].target)) {
                            c = colorSwaps[j].replaceWith;
                            break;
                        }
                    }
                }

                if (c != null) {
                    ctx.fillStyle = c.getDrawColor();
                    ctx.fillRect(p.x, p.y, 1, 1);
                }

                i++;
            }
        };

        return exports;
    };

});
