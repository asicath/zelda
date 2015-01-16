define(['jquery', 'dev/demo_room', 'dev/store_room', 'dev/demo_draw', 'dev/logo', 'controller/load_rooms'], function($, DemoRoom, StoreRoom, DemoDraw, Logo, LoadRooms) {

return function() {

    var my = {
        virtualWidth: 342,
        virtualHeight: 192
    };

    var room = null;
    var previousRoom;
    var loading = false;
    var xOffset, yOffset;
    var treasureRoomCount = 0;

    // guaranteed one call per 16ms
    my.processFrame = function() {

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
                loadedRoom.transferPlayers(previousRoom);
            }

            room = loadedRoom;
            loading = false;
            xOffset = Math.floor((my.virtualWidth - room.rect.width)/2);
            yOffset = Math.floor((my.virtualHeight - room.rect.height));
            room.onComplete = nextRoom;
        };

        if (++treasureRoomCount > 1) {
            treasureRoomCount = 0;
            roomType = StoreRoom;

            LoadRooms.loadRoomJsonFromOverlay('core/assets/rooms/cave.gif', 'core/assets/rooms/cave_overlay.gif', 'first', function(data) {
                var room = roomType(data);
                room.title = "store";
                onSuccess(room);
            });
            loading = true;

            if (Directives) Directives.nextMessage(3);
        }
        else {
            roomType = DemoRoom;

            LoadRooms.loadRoomJsonFromOverlay('chains/stages/shin/dessertONE.gif', 'chains/stages/shin/dessertONE_map.gif', 'first', function(data) {
                var room = roomType(data);
                room.title = "dessert";
                onSuccess(room);
            });


            loading = true;

            Directives.nextMessage(-1);
        }



    };



    var nextRoom = function() {
        previousRoom = room;
        room = null;
    };


    // one call per animation call from window
    my.drawFrame = function(ctx) {

        if (!room) {
            //DrawText.drawText(ctx, "loading", 64, 64);
            return;
        }

        drawMenu(ctx);

        // draw the room
        room.drawRoom(ctx, xOffset, yOffset);

    };

    var drawMenu = function(ctx) {
        // black out the sides
        ctx.fillStyle = 'black';
        // left
        ctx.fillRect(0, yOffset, xOffset, room.rect.height);
        // right
        ctx.fillRect(xOffset + room.rect.width, yOffset, xOffset, room.rect.height);
        // top
        ctx.fillRect(0, 0, my.virtualWidth, yOffset);

        // draw the arcade overlay
        DemoDraw.drawInfo(ctx, room, my.virtualWidth, my.virtualHeight);
    };

    var loadRoom = function(x, y, type, success) {

        // generate random if not specified
        if (x == null || y == null) {
            var c = getRandomRoomCoords();
            x = c.x;
            y = c.y;
        }

        if (x.length == 1) x = "0" + x;
        if (y.length == 1) y = "0" + y;

        LoadRooms.loadRoomJson('', baseUrl + 'core/assets/rooms/ow' + x + '-' + y + '.js', function(data) {
            var room = type(data);
            room.title = "room " + x + "-" + y;
            success(room);
        });

    };

    var invalidRooms = [
        // split
        {x:3, y:2},
        {x:13, y:1},
        {x:12, y:5},
        {x:12, y:6},
        {x:5, y:5},
        {x:2, y:6},
        {x:13, y:6},
        {x:7, y:2},
        {x:11, y:4},
        {x:5, y:7},
        {x:2, y:7},
        {x:7, y:1},

        // too small
        {x:6, y:4},
        {x:14, y:0},
        {x:6, y:3},
        {x:15, y:7},
        {x:0, y:0},
        {x:9, y:1},
        {x:2, y:0},
        {x:3, y:0},
        {x:7, y:0}
    ];

    var getRandomRoomCoords = function() {
        var validRoom = false;
        var c;
        while (!validRoom) {
            c = {
                x: Math.floor(Math.random() * 16).toString(),
                y: Math.floor(Math.random() * 8).toString()
            };
            validRoom = true;
            for (var i = 0; i < invalidRooms.length; i++) {
                if (c.x == invalidRooms[i].x && c.y == invalidRooms[i].y) {
                    validRoom = false;
                    break;
                }
            }
        }

        return c;
    };



    return my;
};
});