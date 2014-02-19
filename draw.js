
var factor = 0;
var linkX = 128, linkY = 88, linkI = 0, linkStep = 0;
var screen;

var drawRoom = function(room, sprites, linkSprites) {

    var start = new Date();

    var canvas = document.getElementById('img');

    if (!room.sizedImage) {

        //var start = new Date();

        var virtualWidth = 256;
        var virtualHeight = 176;

        // find the maximum screen size

        factor = Math.min(canvas.width / virtualWidth, canvas.height / virtualHeight);
        screen = {
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
        var palates = [Palates.OutsideGreen, Palates.OutsideBrown, Palates.OutsideGrey, Palates.AllBlack];
        var i = 0;
        while (i < room.tiles.length) {
            var t = room.tiles[i];
            drawSprite(ctx, upscaleFactor, sprites[t.index], t.x, t.y, palates[t.palate]);
            i++;
        }

        console.log(new Date() - start);
        var start = new Date();


        // downscale to exact screen size
        var resize = document.createElement('canvas');
        resize.width = screen.width;
        resize.height = screen.height;
        ctx = resize.getContext('2d');
        ctx.drawImage(buffer, 0, 0, screen.width, screen.height);



        room.sizedImage = resize;

        console.log(new Date() - start);
        var start = new Date();
    }



    ctx = canvas.getContext('2d');

    // Center...
    //var container = $(canvas).parent();
    var self = $(canvas);
    var xOffset = (screen.width - self.width()) / 2;
    var yOffset = (screen.height - self.height()) / 2;
    ctx.save();
    ctx.translate(-xOffset,-yOffset);

    // draw to the real screen
    ctx.drawImage(room.sizedImage, 0, 0);

    //now the chars
    drawSprite(ctx, factor, linkSprites[linkI + linkStep], linkX, linkY, Palates.LinkGreen);


    renderTime[renderIndex] = new Date() - start;
    renderIndex = (renderIndex + 1) % 60;

    ctx.font = '10pt Calibri';
    ctx.fillStyle = 'white';
    ctx.fillText('frame count:' + frameCount++, 0, 20);
    var max = -1;
    for (var i = 0; i < renderTime.length; i++) {
        if (max < renderTime[i]) max = renderTime[i];
    }

    ctx.fillText('max render time:' + max, 0, 40);

    ctx.restore();
};

var renderTime = [];
var renderIndex = 0;

var frameCount = 0;


var drawSprite = function(ctx, pixelScale, sprite, x, y, palate) {

    if (!sprite.cache) sprite.cache = {};

    var key = pixelScale.toString();

    if (!sprite.cache[key]) {
        var pixelScaleUp = Math.ceil(pixelScale);

        if (pixelScale == pixelScaleUp) {
            // direct draw, no need to upscale
            sprite.cache[key] = createSpriteCanvas(pixelScale, sprite, palate);
        }
        else {
            // get the upscaled image
            var upscaleKey = pixelScaleUp.toString();
            sprite.cache[upscaleKey] = createSpriteCanvas(pixelScaleUp, sprite, palate);

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
var createSpriteCanvas = function(pixelScale, sprite, palate) {
    var img = document.createElement('canvas');
    img.width = sprite.width * pixelScale;
    img.height = sprite.height * pixelScale;
    var context = img.getContext('2d');

    // do the actual rendering of the pixels
    drawSpriteFromPixels(context, pixelScale, sprite, palate);

    return img;
};


// Draw the raw pixels of a sprite to the specified canvas context
var drawSpriteFromPixels = function(ctx, pixelScale, sprite, palate) {
    var i = 0;
    while (i < sprite.pixels.length) {

        var p = sprite.pixels[i];

        ctx.fillStyle = p.getColor(palate);
        ctx.fillRect(
            p.x * pixelScale,
            p.y * pixelScale,
            pixelScale,
            pixelScale
        );

        i++;
    }
};



var fullscreen = function() {

    var canvas = document.getElementById('img');
    var container = $(canvas).parent();
    canvas = $(canvas);

    // Set width and height
    if (canvas.attr('width') != container.width()) { canvas.attr('width', container.width()); }
    if (canvas.attr('height') != container.height()) { canvas.attr('height', container.height()); }


};



var startDraw = function(room, sprites, linkSprites) {

    fullscreen();

    //setInterval(function() {
    //    drawRoom(room, sprites, linkSprites);
    //}, 17);

    function animate() {
        requestAnimFrame( animate );
        drawRoom(room, sprites, linkSprites);
    }

    animate();



    $(window).resize(function() {
        fullscreen();
        room.sizedImage = null;
    });
};




