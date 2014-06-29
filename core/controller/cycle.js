
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
    });

    /*
    // Setup the model frame process
    var prev = new Date();
    var time = 0;
    var frameTime = 1000 / 60;

    var processPendingFrames = function() {
        var now = new Date();
        time += now - prev; // add some more time
        prev = now;

        while (time >= frameTime) {
            time -= frameTime;
            my.processFrame();
        }
    };

    */

    var needsDraw = false;

    // process a single frame of time
    my.processFrame = function() {
        needsDraw = true;
    };


    var targetFrameTime = 1000/60;

    var gameFrame = function() {
        setTimeout(gameFrame, targetFrameTime);

        // update any player input before processing frames
        gamepadSupport.pollStatus();

        //processPendingFrames();

        // just one frame
        my.processFrame();
    };



    // cycle initiating model frames events and view drawing
    var animate = function() {

        // setup the next frame draw
        requestAnimFrame( animate );

        if (!needsDraw) return;
        needsDraw = false;

        my.drawFrame();
    };

    my.drawFrame = function() {

    };

    my.start = function() {
        gameFrame();
        animate();
    };



    return my;
};



