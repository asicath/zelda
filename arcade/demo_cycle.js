
var DemoCycle = function(room) {
    var virtualWidth = 342;
    var virtualHeight = 192;

    var my = Cycle(virtualWidth, virtualHeight);

    // guaranteed one call per 16ms
    my.processFrame = function() {
        // Give the room a frame of animation
        room.executeFrame();
    };

    var xOffset = Math.floor((virtualWidth - room.rect.width)/2);
    var yOffset = Math.floor((virtualHeight - room.rect.height));

    // one call per animation call from window
    my.drawFrame = function(ctx) {

        // black out the sides
        ctx.fillStyle = 'black';
        // left
        ctx.fillRect(0, yOffset, xOffset, room.rect.height);
        // right
        ctx.fillRect(xOffset + room.rect.width, yOffset, xOffset, room.rect.height);
        // top
        ctx.fillRect(0, 0, virtualWidth, yOffset);


        // draw the room
        View.drawRoom(ctx, xOffset, yOffset, room);

        // draw the arcade overlay
        DemoDraw.drawInfo(ctx, room, virtualWidth, virtualHeight);


    };

    return my;
};