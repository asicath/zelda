
var startDraw = function(room, sprites, linkSprites) {



    // Make sure that the canvas is taking the entire window
    View.fullscreen();

    $(window).resize(function() {

        // ensure the canvas is taking up the whole parent
        View.fullscreen();

        // reset the room cache
        room.sizedImage = null;

    });



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
            processFrame();
        }
    };

    // process a single frame of time
    var processFrame = function() {
        // Process input
        //checkPlayerInput();
        room.executeFrame(null);
    };



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



    // cycle initiating model frames events and view drawing
    function animate() {

        gamepadSupport.pollStatus();

        // setup the next frame draw
        requestAnimFrame( animate );

        // process the model time
        processPendingFrames();

        // now draw
        View.drawRoom(room, sprites, linkSprites);
    }

    animate();


};



