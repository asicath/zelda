
var factor = 0;
var linkX = 128, linkY = 88, linkI = 0, linkStep = 0;
var screen;

var drawRoom = function(room, sprites, linkSprites) {

    var start = new Date();

    var canvas = document.getElementById('img');

    if (!room.sizedImage) {
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




        // downscale to exact screen size
        var resize = document.createElement('canvas');
        resize.width = screen.width;
        resize.height = screen.height;
        ctx = resize.getContext('2d');
        ctx.drawImage(buffer, 0, 0, screen.width, screen.height);



        room.sizedImage = resize;
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


    var renderTime = new Date() - start;
    ctx.font = '20pt Calibri';
    ctx.fillStyle = 'white';
    ctx.fillText('frame count:' + frameCount++, 0, 20);
    ctx.fillText('render time:' + renderTime, 0, 40);

    ctx.restore();
};

var frameCount = 0;


var drawSprite = function(ctx, pixelScale, sprite, x, y, palate) {

    var i = 0;
    while (i < sprite.pixels.length) {

        var p = sprite.pixels[i];

        ctx.fillStyle = p.getColor(palate);
        ctx.fillRect(
            x * pixelScale + p.x * pixelScale,
            y * pixelScale + p.y * pixelScale,
            pixelScale,
            pixelScale
        );

        i++;
    }

};

$(document).on('keypress', function(e1, e2, e3) {

    var stepAmount = 3;

    switch (e1.which) {
        case 119: linkY-=stepAmount; linkI = 0; break;
        case 115: linkY+=stepAmount; linkI = 3; break;
        case  97: linkX-=stepAmount; linkI = 6; break;
        case 100: linkX+=stepAmount; linkI = 9; break;
    }

    linkStep = linkStep > 0 ? 0 : 1;

});

var fullscreen = function() {

    var canvas = document.getElementById('img');
    var container = $(canvas).parent();
    canvas = $(canvas);

    // Set width and height
    if (canvas.attr('width') != container.width()) { canvas.attr('width', container.width()); }
    if (canvas.attr('height') != container.height()) { canvas.attr('height', container.height()); }


};




loadSprites('outside.gif', function(sprites) {
    loadSprites('link.gif', function(linkSprites) {

        $.getJSON('ow07-06.js').done(function(room) {

            fullscreen();
            setInterval(function() {
                drawRoom(room, sprites, linkSprites);
            }, 17);

            $(window).resize(function() {
                fullscreen();
                room.sizedImage = null;
            });


        }).fail(function(e1, e2, e3) {
            console.log( "error" );
        });
    });
});