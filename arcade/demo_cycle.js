
var DemoCycle = function() {
    var virtualWidth = 342;
    var virtualHeight = 192;
    var room = null;
    var previousRoom;
    var loading = false;
    var xOffset, yOffset;

    var my = Cycle(virtualWidth, virtualHeight);

    // guaranteed one call per 16ms
    my.processFrame = function() {

        if (room != null) {
            // Give the room a frame of animation
            room.executeFrame();
        }
        else if (loading) {
            // wait
        }
        else {
            loadRoom(null, null, function(loadedRoom) {

                if (previousRoom) {
                    loadedRoom.players = previousRoom.players;
                    for (var i = 0; i < loadedRoom.players.length; i++) {
                        // Allow start if possible
                        if (loadedRoom.players[i] && !loadedRoom.players[i].isDead) {
                            loadedRoom.addEntityAtOpenTile(loadedRoom.players[i]);
                        }
                    }
                }

                room = loadedRoom;
                loading = false;
                xOffset = Math.floor((virtualWidth - room.rect.width)/2);
                yOffset = Math.floor((virtualHeight - room.rect.height));
                room.onComplete = nextRoom;
            });
            loading = true;
        }

    };

    var nextRoom = function() {
        previousRoom = room;
        room = null;
    };


    // one call per animation call from window
    my.drawFrame = function(ctx) {

        if (!room) {
            View.drawText(ctx, "loading", 64, 64);
            return;
        }

        drawMenu(ctx);

        // draw the room
        View.drawRoom(ctx, xOffset, yOffset, room);

    };

    var drawMenu = function(ctx) {
        // black out the sides
        ctx.fillStyle = 'black';
        // left
        ctx.fillRect(0, yOffset, xOffset, room.rect.height);
        // right
        ctx.fillRect(xOffset + room.rect.width, yOffset, xOffset, room.rect.height);
        // top
        ctx.fillRect(0, 0, virtualWidth, yOffset);

        // draw the arcade overlay
        DemoDraw.drawInfo(ctx, room, virtualWidth, virtualHeight);
    };

    var loadRoom = function(x, y, success) {

        // generate random if not specified
        x = x || Math.floor(Math.random() * 16).toString();
        y = y || Math.floor(Math.random() * 8).toString();

        if (x.length == 1) x = "0" + x;
        if (y.length == 1) y = "0" + y;

        loadRoomJson('', baseUrl + 'assets/rooms/ow' + x + '-' + y + '.js', function(data) {
            var room = DemoRoom(data);
            room.title = "room " + x + "-" + y;
            success(room);
        });

    };

    return my;
};