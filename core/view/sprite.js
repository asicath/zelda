
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
            var pixelScaleUp = Math.ceil(pixelScale);

            if (pixelScale == pixelScaleUp) {
                // direct draw, no need to upscale
                exports.cache[key] = createSpriteCanvas(pixelScale);
            }
            else {
                // get the upscaled image
                var upscaleKey = pixelScaleUp.toString();
                exports.cache[upscaleKey] = createSpriteCanvas(pixelScaleUp);

                // now downscale
                var img = document.createElement('canvas');
                img.width = Math.ceil(exports.width * pixelScale);
                img.height = Math.ceil(exports.height * pixelScale);
                var context = img.getContext('2d');

                context.drawImage(exports.cache[upscaleKey], 0, 0, exports.width * pixelScale, exports.height * pixelScale);

                exports.cache[key] = img;
            }


        }

        // Draw the cached image
        ctx.drawImage(exports.cache[key], x * pixelScale, y * pixelScale);

    };


    // Return a canvas object with the sprite rendered to it
    var createSpriteCanvas = function(pixelScale) {
        var img = document.createElement('canvas');
        img.width = exports.width * pixelScale;
        img.height = exports.height * pixelScale;
        var context = img.getContext('2d');

        // do the actual rendering of the pixels
        drawSpriteFromPixels(context, pixelScale);

        return img;
    };


    // Draw the raw pixels of a sprite to the specified canvas context
    var drawSpriteFromPixels = function(ctx, pixelScale) {
        var i = 0;
        var c = null;
        while (i < exports.pixels.length) {

            var p = exports.pixels[i];

            c = p.getColor();

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

    return exports;
};


var loadSpritesFromImgUrl = function(imgUrl, map, success) {

    var img = new Image();
    img.src = baseUrl + imgUrl;
    img.onload = function(){

        // Create canvas, size it, get the context
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');

        // Draw the image to the offscreen canvas
        ctx.drawImage(img, 0, 0, img.width, img.height);

        var sprites = [];

        if (!map) {
            var xStart = 0;
            var incr = img.height;
            map = [];
            while (xStart < img.width) {
                map.push({
                    x: xStart,
                    y: 0,
                    width: incr,
                    height: incr
                });
                xStart += incr;
            }
        }

        for (var j = 0; j < map.length; j++) {

            var info = map[j];

            // Look at the pixels
            var pixelData = ctx.getImageData(info.x, info.y, info.width, info.height).data;

            var sprite = Sprite(info.width, info.height);

            // Create color map first
            var i = 0, x, y;
            while (i < pixelData.length) {
                x = (i / 4) % sprite.width;
                y = ((i / 4) - x) / sprite.width;

                // Load up the natural color
                var naturalColor = {
                    r: pixelData[i],
                    g: pixelData[i + 1],
                    b: pixelData[i + 2],
                    a: pixelData[i + 3]
                };

                sprite.pixels.push(Pixel(-1, x, y, naturalColor));

                i += 4;
            }

            sprites.push(sprite);

        }

        success(sprites);
    };
};


