


var Sprite = function(width, height) {

    var exports = {
        width: width,
        height: height,
        pixels: []
    };

    exports.getPixel = function(x, y) {
        if (x < 0 || x >= exports.width) {return null;}
        if (y < 0 || y >= exports.height) {return null;}

        var i = x + y * exports.width;
        return exports.pixels[i];
    };

    exports.drawSprite = function(ctx, x, y) {

        var pixelScale = 1;

        if (!exports.cache) exports.cache = {};

        var key = pixelScale.toString();

        if (!exports.cache[key]) {
            exports.cache[key] = createSpriteCanvas(pixelScale);
            console.log('cache:' + key);
        }

        // Draw the cached image
        ctx.drawImage(exports.cache[key], x * pixelScale, y * pixelScale);

    };


    // Return a canvas object with the sprite rendered to it
    var createSpriteCanvas = function() {

        var img = document.createElement('canvas');
        img.width = exports.width;
        img.height = exports.height;
        var context = img.getContext('2d');

        // do the actual rendering of the pixels
        drawSpriteFromPixels(context);

        return img;
    };


    // Draw the raw pixels of a sprite to the specified canvas context
    var drawSpriteFromPixels = function(ctx) {
        var i = 0;
        var c = null;
        while (i < exports.pixels.length) {

            var p = exports.pixels[i];

            c = p.getDrawColor();

            if (c != null) {
                ctx.fillStyle = c;
                ctx.fillRect(p.x, p.y, 1, 1);
            }

            i++;
        }
    };

    return exports;
};


