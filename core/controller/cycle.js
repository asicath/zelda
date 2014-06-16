
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
    View.fullscreen();

    $(window).resize(function() {
        my.onWindowResize();
    });

    // default resize event
    my.onWindowResize = function() {
        // ensure the canvas is taking up the whole parent
        View.fullscreen();
    };



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

    // process a single frame of time
    my.processFrame = function() {};



    // cycle initiating model frames events and view drawing
    my.animate = function() {

        // setup the next frame draw
        requestAnimFrame( my.animate );

        // update any player input before processing frames
        gamepadSupport.pollStatus();

        // process the model time
        processPendingFrames();

    };

    my.start = function() {
        my.animate();
    };



    return my;
};



