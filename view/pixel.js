
var loadSprites = function(imgUrl, success) {

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
        var xStart = 0;

        while (xStart < img.width) {
            // Look at the pixels
            var pixelData = ctx.getImageData(xStart, 0, 16, 16).data;

            var sprite = Sprite(16, 16);

            var i = 0;
            while (i < pixelData.length) {
                var x = (i / 4) % sprite.width;
                var y = ((i / 4) - x) / sprite.width;

                // 0, 64, 128, 191
                // only look at red value
                var color = pixelData[i]; //pixelData[i++], pixelData[i++], pixelData[i++]
                var colorIndex = 0;
                switch (color) {
                    case 0: colorIndex = 0; break;
                    case 64: colorIndex = 1; break;
                    case 128: colorIndex = 2; break;
                    case 191: colorIndex = 3; break;
                }

                i += 4;

                var pixel = Pixel(colorIndex, x, y);

                sprite.pixels.push(pixel);
            }

            sprites.push(sprite);

            xStart += 16;
        }

        success(sprites);
    };
};


var Sprite = function(width, height) {

    var exports = {
        width: width,
        height: height,
        pixels: []
    };

    var getPixel = function(x, y) {
        if (x < 0 || x >= exports.width) {return null;}
        if (y < 0 || y >= exports.height) {return null;}

        var i = x + y * exports.width;
        return exports.pixels[i];
    };

    return exports;
};


var Pixel = function(i, x, y) {

    var exports = {
        i: i,
        x: x,
        y: y
    };

    exports.sameColor = function(p) {
        return p.r == exports.r && p.g == exports.g && p.b == exports.b;
    };

    exports.getColor = function(palette) {
        if (!palette) {
            palette = Palettes.Default;
        }
        var color = palette.colors[exports.i];
        return 'rgba(' + color[0] + ', ' + color[1] + ', ' + color[2] + ', ' + (color[3] / 255) + ')'
    };

    return exports;
};
