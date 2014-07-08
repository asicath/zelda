
window.requestAnimFrame = ( function() {
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


var Cycle = function(virtualWidth, virtualHeight) {

    var my = {
        canvas: null,
        ctx: null
    };



    // Start both chain reactions
    my.start = function() {
        gameFrame();
        animate();
    };



    // 60 frames per second
    var targetFrameTime = 1000/60;
    var needsDraw = false;

    var gameFrame = function() {
        setTimeout(gameFrame, targetFrameTime);

        // update any player input before processing frames
        gamepadSupport.pollStatus();

        // just one frame
        my.processFrame();

        // Let the animate function know that its ok to draw
        needsDraw = true;
    };

    // process a single frame of time
    my.processFrame = function() {};





    // *** DISPLAY ***

    var needsResize = true;

    my.canvas = document.getElementById('img');
    my.ctx = my.canvas.getContext('2d');

    my.ctx.mozImageSmoothingEnabled = false;
    my.ctx.webkitImageSmoothingEnabled = false;
    my.ctx.msImageSmoothingEnabled = false;
    my.ctx.imageSmoothingEnabled = false;

    // Create the offscreen canvas if need be
    // Should only be the first time throgh

    var offscreen = document.createElement('canvas');
    offscreen.width = virtualWidth;
    offscreen.height = virtualHeight;
    var offscreenCtx = offscreen.getContext('2d');

    $(window).resize(function() {
        // reset the room cache
        needsResize = true;
        needsDraw = true;
    });

    // cycle initiating model frames events and view drawing
    var animate = function() {

        // setup the next frame draw
        requestAnimFrame( animate );

        if (needsDraw) {

            if (needsResize) {
                fullscreen();
                needsResize = false;
            }

            my.drawFrame(offscreenCtx);

            // *** DRAW TO SCREEN ***

            // draw to the onscreen canvas

            my.ctx.drawImage(offscreen, 0, 0, offscreen.width, offscreen.height, drawOffset.x, drawOffset.y, drawWidth, drawHeight);


            needsDraw = false;
        }

    };

    my.drawFrame = function(ctx) {};


    var drawWidth, drawHeight;
    var drawOffset;

    // ensure the canvas is taking up the whole parent
    var fullscreen = function() {

        var c = $(my.canvas);

        var container = c.parent();
        var displayWidth = container.width();
        var displayHeight = container.height();

        // Set width and height
        if (c.attr('width') != displayWidth) { c.attr('width', displayWidth); }
        if (c.attr('height') != displayHeight) { c.attr('height', displayHeight); }

        // now determine offsets
        var factor = Math.min(displayWidth / virtualWidth, displayHeight / virtualHeight);
        drawWidth = Math.floor(virtualWidth * factor);
        drawHeight = Math.floor(virtualHeight * factor);

        // determine where to draw in the display
        drawOffset = {
            x: Math.abs(drawWidth - displayWidth) / 2,
            y: Math.abs(drawHeight - displayHeight) / 2
        }
    };




    return my;
};



