
var DemoCycle = function(room) {
    var my = Cycle();

    // Make sure to clear the room's cache on resize?
    var onWindowResize_parent = my.onWindowResize;
    my.onWindowResize = function() {
        onWindowResize_parent();

        // reset the room cache
        View.needsResize = true;
    };


    var processFrame_parent = my.processFrame;
    my.processFrame = function() {
        // does nothing...
        processFrame_parent();

        // Give the room a frame of animation
        room.executeFrame();
    };

    var animate_parent = my.animate;
    my.animate = function() {

        animate_parent();

        // now draw
        View.drawRoom(room);

    };

    return my;
};