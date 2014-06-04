
var Sprite = function(width, height) {

    var exports = {
        width: width,
        height: height,
        pixels: [],
        naturalPalette: null
    };

    exports.getPixel = function(x, y) {
        if (x < 0 || x >= exports.width) {return null;}
        if (y < 0 || y >= exports.height) {return null;}

        var i = x + y * exports.width;
        return exports.pixels[i];
    };

    return exports;
};


var loadSpritesFromImgUrl = function(imgUrl, map, success, useNaturalPalette) {

    var img = new Image();
    img.src = imgUrl;
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

            if (!useNaturalPalette) {
                // Then map the colors to indexes
                var pixel;
                for (i=0;i < sprite.pixels.length;i++) {

                    // Get the pixel
                    pixel = sprite.pixels[i];

                    switch (pixel.naturalColor.r) {
                        case 0: pixel.i = 0; break;
                        case 64: pixel.i = 1; break;
                        case 128: pixel.i = 2; break;
                        case 191: pixel.i = 3; break;
                    }

                }
            }

            sprites.push(sprite);


        }

        success(sprites);
    };
};


