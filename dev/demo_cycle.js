define(['jquery', 'dev/demo_room', 'dev/demo_draw', 'controller/load_rooms'], function($, DemoRoom, DemoDraw, LoadRooms) {

return function(Monster, randomPosition) {

    var my = {
        virtualWidth: 342,
        virtualHeight: 192
    };

    var room = null;
    var loading = false;
    var xOffset, yOffset;

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
        LoadRooms.loadRoomJsonFromOverlay('chains/stages/shin/images/desert.png', 'chains/stages/shin/images/desert_map.png', 'first', function(data) {
            room = DemoRoom(data, Monster, randomPosition);
            room.title = "dessert";

            loading = false;
            xOffset = Math.floor((my.virtualWidth - room.rect.width)/2);
            yOffset = Math.floor((my.virtualHeight - room.rect.height));
        });

        loading = true;

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

    return my;
};
});