var RoomRunnerCycle = function(rooms) {
    var my = Cycle();

    var currentRoom = rooms['07_07'];
    var x = 7;
    var y = 7;
    var transition = null;

    // guaranteed one call per 16ms
    var processFrame_parent = my.processFrame;
    my.processFrame = function() {
        // does nothing...
        processFrame_parent();

        // Give the room a frame of animation
        if (!transition)
        currentRoom.executeFrame();
    };

    // one call per animation call from window
    var animate_parent = my.animate;
    my.animate = function() {

        animate_parent();

        // demo the edge events
        if (!transition && currentRoom.transition) {

            if (currentRoom.transition == Directions.top && y > 0) {
                transition = {
                    percent: 0,
                    room: null,
                    direction: Directions.bottom
                };
                y--;
            }

            else if (currentRoom.transition == Directions.bottom && y < 7) {
                transition = {
                    percent: 0,
                    room: null,
                    direction: Directions.top
                };
                y++;
            }

            else if (currentRoom.transition == Directions.left && x > 0) {
                transition = {
                    percent: 0,
                    room: null,
                    direction: Directions.right
                };
                x--;
            }

            else if (currentRoom.transition == Directions.right && x < 15) {
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

                // Remove Players
                my.transitionPlayersOut(currentRoom);
            }

        }

        if (transition) {

            // draw the transition
            View.drawRoomTransition(currentRoom, transition.room, transition.percent, transition.direction);

            // scrolling
            transition.percent += 0.01;

            // done scrolling
            if (transition.percent >= 1.0) {
                currentRoom.transition = null;
                currentRoom = transition.room;
                my.transitionPlayersIn(currentRoom, transition.direction);
                transition = null;

            }
        }
        else {
            // now draw, taking up the entire canvas
            View.drawRoomFullScreen(currentRoom);
        }


    };

    my.transitionPlayersOut = function(room) {
        transition.players = room.players;
        for (var i = 0; i < room.players.length; i++) {

            if (!room.players[i]) {continue;}
            room.removeEntity(room.players[i]);
        }
        room.players = [];
    };

    my.transitionPlayersIn = function(room, edgeDirection) {
        for (var i = 0; i < transition.players.length; i++) {

            if (!transition.players[i]) {continue;}

            var p = transition.players[i];

            switch(edgeDirection) {
                case Directions.top:
                    p.position.y = 2;
                    break;
                case Directions.bottom:
                    p.position.y = 158;
                    break;
                case Directions.left:
                    p.position.x = 2;
                    break;
                case Directions.right:
                    p.position.x = 238;
                    break;
            }


            room.addEntity(p);
            room.players[i] = p;
        }

    };



    return my;
};