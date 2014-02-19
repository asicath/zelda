

var drawSprite = function(ctx, pixelScale, sprite, x, y) {

    var i = 0;
    while (i < sprite.pixels.length) {

        var p = sprite.pixels[i];

        ctx.fillStyle = p.getColor();
        ctx.fillRect(
            x * pixelScale + p.x * pixelScale,
            y * pixelScale + p.y * pixelScale,
            pixelScale,
            pixelScale
        );

        i++;
    }

};





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

                var pixel = Pixel(pixelData[i++], pixelData[i++], pixelData[i++], pixelData[i++], x, y);
                sprite.pixels.push(pixel);
            }

            sprites.push(sprite);

            xStart += 16;
        }

        success(sprites);
    };
};



var drawRoom = function(room, sprites) {
    var canvas = document.getElementById('img');

    if (!room.sizedImage) {
        var virtualWidth = 256;
        var virtualHeight = 176;

        // find the maximum screen size

        var factor = Math.min(canvas.width / virtualWidth, canvas.height / virtualHeight);
        var screen = {
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
        var i = 0;
        while (i < room.tiles.length) {
            var t = room.tiles[i];
            drawSprite(ctx, upscaleFactor, sprites[t.index], t.x, t.y);
            i++;
        }


        // downscale to exact screen size
        var resize = document.createElement('canvas');
        resize.width = screen.width;
        resize.height = screen.height;
        ctx = resize.getContext('2d');
        ctx.drawImage(buffer, 0, 0, screen.width, screen.height);


        room.sizedImage = resize;
    }

    // draw to the real screen
    ctx = canvas.getContext('2d');
    ctx.drawImage(room.sizedImage, 0, 0);


    ctx.font = '20pt Calibri';
    ctx.fillStyle = 'white';
    ctx.fillText('frame count:' + frameCount++, 0, 20);
};

var frameCount = 0;


loadSprites('outside.gif', function(sprites) {

    $.getJSON('ow07-06.js').done(function(room) {

        setInterval(function() {
            var start = new Date();
            drawRoom(room, sprites);
            console.log((new Date() - start));
        }, 17);


    }).fail(function(e1, e2, e3) {
        console.log( "error" );
    });

});


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



var Pixel = function(r, g, b, a, x, y) {

    var exports = {
        r: r,
        g: g,
        b: b,
        a: a,
        x: x,
        y: y
    };

    exports.sameColor = function(p) {
        return p.r == exports.r && p.g == exports.g && p.b == exports.b;
    };

    exports.getColor = function() {

        return 'rgba(' + exports.r + ', ' + exports.g + ', ' + exports.b + ', ' + (exports.a / 255) + ')'
    };

    return exports;
};