define([
    'jquery',
    'chains/stages/shin/desert_room',
    'chains/stages/shin/skull_room',
    'dev/demo_draw',
    'controller/load_rooms'
], function(
    $,
    DesertRoom,
    SkullRoom,
    DemoDraw,
    LoadRooms
) {

    return function(options) {

        var my = {
            virtualWidth: 342,
            virtualHeight: 192
        };

        // standard room size
        var roomWidth = 256;
        var roomHeight = 176;

        // where to draw the room
        var xOffset = Math.floor((my.virtualWidth - roomWidth)/2);
        var yOffset = Math.floor((my.virtualHeight - roomHeight));


        var rooms = [];

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

            for (var i = 0; i < rooms.length; i++) {
                // Give the room a frame of animation
                rooms[i].executeFrame();
            }

        };

        function loadDesertRoom() {
            // needs a new room
            LoadRooms.loadRoomJsonFromOverlay('chains/stages/shin/images/desert.png', 'chains/stages/shin/images/desert_map.png', 'first', function(data) {
                var room = DesertRoom(data, options.Monster, true);
                room.title = "dessert";
                addRoom(room);
            });
        }

        function loadTalkingSkullRoom() {

            SkullRoom(addRoom);

            // needs a new room
            LoadRooms.loadRoomJsonFromOverlay('chains/stages/shin/images/desert.png', 'chains/stages/shin/images/desert_map.png', 'first', function(data) {
                var room = SkullRoom(data);
                room.title = "skulls";
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