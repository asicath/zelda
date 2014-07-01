
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


var Cycle = function() {

    var my = {};

    // Make sure that the canvas is taking the entire window
    View.init();

    $(window).resize(function() {
        // reset the room cache
        View.needsResize = true;
        needsDraw = true;
    });

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

    // cycle initiating model frames events and view drawing
    var animate = function() {

        // setup the next frame draw
        requestAnimFrame( animate );

        if (needsDraw) {
            my.drawFrame();
            needsDraw = false;
        }

    };

    my.drawFrame = function() {};

    return my;
};



