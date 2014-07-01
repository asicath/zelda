
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
                var color = {
                    r: pixelData[i],
                    g: pixelData[i + 1],
                    b: pixelData[i + 2],
                    a: pixelData[i + 3]
                };

                sprite.pixels.push(Pixel(x, y, color));

                i += 4;
            }

            sprites.push(sprite);

        }

        success(sprites);
    };
};


