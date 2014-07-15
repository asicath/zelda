
var DemoCycle = function() {
    var virtualWidth = 342;
    var virtualHeight = 192;
    var room = null;
    var previousRoom;
    var loading = false;
    var xOffset, yOffset;
    var treasureRoomCount = 0;


    // *** LOGO ***
    var showLogo = false;

    if (showLogo) {
        var logoMusic = new Audio("aum_logo.mp3");

        logoMusic.addEventListener('ended', function(){
            showLogo = false;
        });

        logoMusic.addEventListener('canplay', function(){
            logoMusic.play();
        });

        var endLogo = function() {
            if (showLogo) {
                logoMusic.pause();
                showLogo = false;
            }
        };

        $(document).on('keypress', endLogo);
        $(document).on('click', endLogo);
    }


    // Just temp for forcing right away
    treasureRoomCount = 0;

    var my = Cycle(virtualWidth, virtualHeight);

    // guaranteed one call per 16ms
    my.processFrame = function() {

        // no need for frame, showing logo
        if (showLogo) return;

        if (room != null) {
            // Give the room a frame of animation
            room.executeFrame();
            return;
        }
        else if (loading) {
            // wait
            return;
        }

        // needs a new room
        var roomType = null;

        var onSuccess = function(loadedRoom) {
            if (previousRoom) {
                transferPlayers(previousRoom, loadedRoom);
            }

            room = loadedRoom;
            loading = false;
            xOffset = Math.floor((virtualWidth - room.rect.width)/2);
            yOffset = Math.floor((virtualHeight - room.rect.height));
            room.onComplete = nextRoom;
        };

        if (++treasureRoomCount > 1) {
            treasureRoomCount = 0;
            roomType = StoreRoom;

            loadRoomJsonFromOverlay('assets/rooms/cave.gif', 'assets/rooms/cave_overlay.gif', 'first', function(data) {
                var room = roomType(data);
                room.title = "store";
                onSuccess(room);
            });
            loading = true;
        }
        else {
            roomType = DemoRoom;

            loadRoom(null, null, roomType, onSuccess);
            loading = true;
        }



    };

    var transferPlayers = function(sourceRoom, desRoom) {
        desRoom.players = sourceRoom.players;
        for (var i = 0; i < desRoom.players.length; i++) {
            // Allow start if possible
            if (desRoom.players[i] && !desRoom.players[i].isDead) {
                desRoom.addEntityAtOpenTile(desRoom.players[i]);
            }
        }
    };

    var nextRoom = function() {
        previousRoom = room;
        room = null;
    };


    // one call per animation call from window
    my.drawFrame = function(ctx) {

        if (showLogo) {
            var factor = 2;
            var w = 63 * factor;
            var h = 63 * factor;
            Logo.drawFrame(ctx, Math.floor((virtualWidth - w) / 2), Math.floor((virtualHeight - h) / 2), factor);
            return;
        }


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

    var loadRoom = function(x, y, type, success) {

        // generate random if not specified
        x = x || Math.floor(Math.random() * 16).toString();
        y = y || Math.floor(Math.random() * 8).toString();

        if (x.length == 1) x = "0" + x;
        if (y.length == 1) y = "0" + y;

        loadRoomJson('', baseUrl + 'assets/rooms/ow' + x + '-' + y + '.js', function(data) {
            var room = type(data);
            room.title = "room " + x + "-" + y;
            success(room);
        });

    };



    return my;
};