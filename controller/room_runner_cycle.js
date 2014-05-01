var RoomRunnerCycle = function(rooms) {
    var my = Cycle();

    var currentRoom = rooms['07_07'];
    var x = 7;
    var y = 7;
    var transition = null;

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

        // demo the edge events
        if (!transition) {
            for (var i = 0; i < playerInput.length; i++) {

                if (playerInput[i].up && y > 0) {
                    transition = {
                        percent: 0,
                        room: null,
                        direction: Directions.bottom
                    };
                    y--;
                }

                else if (playerInput[i].down && y < 7) {
                    transition = {
                        percent: 0,
                        room: null,
                        direction: Directions.top
                    };
                    y++;
                }

                else if (playerInput[i].left && x > 0) {
                    transition = {
                        percent: 0,
                        room: null,
                        direction: Directions.right
                    };
                    x--;
                }

                else if (playerInput[i].right && x < 15) {
                    transition = {
                        percent: 0,
                        room: null,
                        direction: Directions.left
                    };
                    x++;
                }

                if (transition) {
                    // determine which room
                    var xVal = x.toString();
                    if (xVal.length == 1) xVal = "0" + xVal;

                    var yVal = y.toString();
                    if (yVal.length == 1) yVal = "0" + yVal;

                    var key = xVal + '_' + yVal;

                    transition.room = rooms[key];
                    transition.room.screen = null;
                }

            }
        }

        if (transition) {

            // draw the transition
            View.drawRoomTransition(currentRoom, transition.room, transition.percent, transition.direction);

            // scrolling
            transition.percent += 0.01;

            // done scrolling
            if (transition.percent >= 1.0) {
                currentRoom = transition.room;
                transition = null;
            }
        }
        else {
            // now draw, taking up the entire canvas
            View.drawRoomFullScreen(currentRoom);
        }


    };



    return my;
};