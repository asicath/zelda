
var DemoCycle = function(room) {
    var my = Cycle();

    // guaranteed one call per 16ms
    my.processFrame = function() {
        // Give the room a frame of animation
        room.executeFrame();
    };

    // one call per animation call from window
    my.drawFrame = function() {
        // now draw, taking up the entire canvas
        View.drawRoomFullScreen(room, function(ctx) {
            // draw the arcade overlay
            DemoDraw.drawInfo(ctx, room);
        });
    };

    return my;
};