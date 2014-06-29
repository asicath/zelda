
var DemoCycle = function(room) {
    var my = Cycle();

    // guaranteed one call per 16ms
    var processFrame_parent = my.processFrame;
    my.processFrame = function() {
        // does nothing...
        processFrame_parent();

        // Give the room a frame of animation
        room.executeFrame();
    };

    // one call per animation call from window
    var drawFrame_parent = my.drawFrame;
    my.drawFrame = function() {

        drawFrame_parent();

        // now draw, taking up the entire canvas
        View.drawRoomFullScreen(room, function(ctx) {
            DemoDraw.drawInfo(ctx, room);
        });

    };

    return my;
};