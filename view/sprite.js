
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


var loadSpritesFromImgUrl = function(imgUrl, map, success) {

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


        }

        success(sprites);
    };
};


