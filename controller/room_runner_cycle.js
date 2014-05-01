var RoomRunnerCycle = function(rooms) {
    var my = Cycle();

    var currentRoom = rooms['07_07'];

    // Make sure to clear the room's cache on resize?
    var onWindowResize_parent = my.onWindowResize;
    my.onWindowResize = function() {
        onWindowResize_parent();

        // reset the room cache
        View.needsResize = true;
    };


    // guaranteed one call per 16ms
    var processFrame_parent = my.processFrame;
    my.processFrame = function() {
        // does nothing...
        processFrame_parent();

        // Give the room a frame of animation
        currentRoom.executeFrame();
    };

    // one call per animation call from window
    var animate_parent = my.animate;
    my.animate = function() {

        animate_parent();

        // now draw, taking up the entire canvas
        //View.drawRoomFullScreen(room);

        View.drawRoomTransition(currentRoom, currentRoom, percent, Directions.right);

        //percent += 0.001;
        //if (percent >= 1.0) {percent -= 1.0;}
    };

    var percent = 1.0;

    return my;
};