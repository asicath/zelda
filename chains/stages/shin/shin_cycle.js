define([
    'jquery',
    'chains/stages/shin/desert_room',
    'chains/stages/shin/skull_room',
    'dev/demo_draw',
    'controller/load_rooms'
], function(
    $,
    DemoRoom,
    SkullRoom,
    DemoDraw,
    LoadRooms
) {

    return function(options) {

        var my = {
            virtualWidth: 342,
            virtualHeight: 192
        };

        var rooms = [];
        var xOffset, yOffset;

        function addRoom(room) {
            rooms.push(room);
        }

        // load the specified room
        if (!options.room) {
            loadDesertRoom();
        }
        else if (options.room == 'talkingSkulls') {
            loadTalkingSkullRoom();
        }



        // guaranteed one call per 16ms
        my.processFrame = function() {

            if (rooms.length == 0) {
                // wait
                return;
            }

            for (var i = 0; i < rooms.length; i++) {
                // Give the room a frame of animation
                rooms[i].executeFrame();
            }

        };

        function loadDesertRoom() {
            // needs a new room
            LoadRooms.loadRoomJsonFromOverlay('chains/stages/shin/images/desert.png', 'chains/stages/shin/images/desert_map.png', 'first', function(data) {
                var room = DemoRoom(data, options.Monster, true);
                room.title = "dessert";

                xOffset = Math.floor((my.virtualWidth - room.rect.width)/2);
                yOffset = Math.floor((my.virtualHeight - room.rect.height));

                addRoom(room);
            });
        }

        function loadTalkingSkullRoom() {
            // needs a new room
            LoadRooms.loadRoomJsonFromOverlay('chains/stages/shin/images/desert.png', 'chains/stages/shin/images/desert_map.png', 'first', function(data) {
                var room = SkullRoom(data);
                room.title = "skulls";

                xOffset = Math.floor((my.virtualWidth - room.rect.width)/2);
                yOffset = Math.floor((my.virtualHeight - room.rect.height));

                addRoom(room);
            });
        }

        // one call per animation call from window
        my.drawFrame = function(ctx) {

            if (rooms.length == 0) {
                //DrawText.drawText(ctx, "loading", 64, 64);
                return;
            }

            for (var i = 0; i < rooms.length; i++) {
                // draw the room
                rooms[i].drawRoom(ctx, xOffset, yOffset);
            }

            drawMenu(ctx);
        };

        var drawMenu = function(ctx) {
            // black out the sides
            ctx.fillStyle = 'black';
            // left
            ctx.fillRect(0, yOffset, xOffset, my.virtualHeight);
            // right
            ctx.fillRect(my.virtualWidth - xOffset, yOffset, xOffset, my.virtualHeight);
            // top
            ctx.fillRect(0, 0, my.virtualWidth, yOffset);

            // draw the arcade overlay
            DemoDraw.drawInfo(ctx, rooms[0], my.virtualWidth, my.virtualHeight);
        };

        return my;
    };
});