define(['./color', './pixel', './sprite'], function(Color, Pixel, Sprite) {

    var SpriteSheet = function (naturalSprites) {
        var my = {
            sprites: naturalSprites
        };

        // will eventually contain a method for mapping all natural sprites to modified color

        return my;
    };


    SpriteSheet.loadFromImgUrl = function (imgUrl, map, width, success) {

        var img = new Image();
        img.src = requirejs.s.contexts._.config.baseUrl + imgUrl;
        img.onload = function () {

            // Create canvas, size it, get the context
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');

            // Draw the image to the offscreen canvas
            ctx.drawImage(img, 0, 0, img.width, img.height);

            var sprites = [];

            if (width) {
                var xStart = 0;
                var incr = width;
                map = [];
                while (xStart < img.width) {
                    map.push({
                        x: xStart,
                        y: 0,
                        width: incr,
                        height: img.height
                    });
                    xStart += incr;
                }
            }

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
                    var color = Color(
                        pixelData[i],
                        pixelData[i + 1],
                        pixelData[i + 2],
                        pixelData[i + 3]
                    );

                    sprite.pixels.push(Pixel(x, y, color));

                    i += 4;
                }

                sprites.push(sprite);

            }

            var sheet = SpriteSheet(sprites);

            success(sheet);
        };
    };

    return SpriteSheet;
});
