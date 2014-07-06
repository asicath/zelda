
var View = (function() {
    var my = {};

    var canvas, ctx;

    my.needsResize = true;

    var virtualWidth = 342;
    var virtualHeight = 192;

    my.virtualWidth = virtualWidth;
    my.virtualHeight = virtualHeight;

    var displayWidth, displayHeight;
    var drawWidth, drawHeight;
    var drawOffset;

    my.init = function() {
        canvas = document.getElementById('img');
        ctx = canvas.getContext('2d');
        my.ctx = ctx;

        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
    };

    // ensure the canvas is taking up the whole parent
    var fullscreen = function() {
        var container = $(canvas).parent();
        var c = $(canvas);

        var displayWidth = container.width();
        var displayHeight = container.height();

        // Set width and height
        if (c.attr('width') != displayWidth) { c.attr('width', displayWidth); }
        if (c.attr('height') != displayHeight) { c.attr('height', displayHeight); }

        // now determine offsets
        var factor = Math.min(displayWidth / virtualWidth, displayHeight / virtualHeight);
        drawWidth = Math.floor(virtualWidth * factor);
        drawHeight = Math.floor(virtualHeight * factor);

        // determine where to draw in the display
        drawOffset = {
            x: Math.abs(drawWidth - displayWidth) / 2,
            y: Math.abs(drawHeight - displayHeight) / 2
        }
    };

    var createRoomBackground = function(room) {

        // Create the virtual screen
        var buffer = document.createElement('canvas');
        buffer.width = room.rect.width;
        buffer.height = room.rect.height;
        var ctxBuffer = buffer.getContext('2d');

        // actually draw the sprites
        if (room.backgroundSprite) {
            room.backgroundSprite[0].drawSprite(ctxBuffer, 0, 0);
        }
        else {
            // draw to the virtual screen
            var i = 0;
            var img;
            while (i < room.tiles.length) {
                var t = room.tiles[i];
                img = t.sprite.getImage(t.imageOptions);
                ctxBuffer.drawImage(img, t.x, t.y);
                i++;
            }
        }

        room.backgroundImage = buffer;

    };

    /*
    my.drawRoomTransition = function(roomPrev, roomNext, percent, direction) {

        if (my.needsResize) {
            roomPrev.screen = null;
            roomNext.screen = null;
            my.needsResize = false;
            fullscreen();
        }

        if (!roomPrev.screen) {
            setSize(roomPrev, canvas.width, canvas.height);
        }

        if (!roomNext.screen) {
            setSize(roomNext, canvas.width, canvas.height);
        }

        // determine offset
        var offsetPrev = {x: 0, y: 0};
        var offsetNext = {x: 0, y: 0};

        switch(direction) {
            case Directions.top:
                offsetPrev.y = -1 * roomPrev.screen.height * percent;
                offsetNext.y = offsetPrev.y + roomPrev.screen.height;
                break;
            case Directions.bottom:
                offsetPrev.y = roomPrev.screen.height * percent;
                offsetNext.y = offsetPrev.y - roomPrev.screen.height;
                break;
            case Directions.left:
                offsetPrev.x = -1 * roomPrev.screen.width * percent;
                offsetNext.x = offsetPrev.x + roomPrev.screen.width;
                break;
            case Directions.right:
                offsetPrev.x = roomPrev.screen.width * percent;
                offsetNext.x = offsetPrev.x - roomPrev.screen.width;
                break;
        }

        // draw the prev room
        drawRoom(ctx, roomPrev, offsetPrev.x, offsetPrev.y);
        drawRoom(ctx, roomNext, offsetNext.x, offsetNext.y);

        // mask top and bottom
        if (roomPrev.screen.yOffset > 0) {
            ctx.clearRect(0,0,canvas.width,Math.ceil(roomPrev.screen.yOffset));
            ctx.clearRect(0, roomPrev.screen.yOffset + roomPrev.screen.height,canvas.width,Math.ceil(roomPrev.screen.yOffset));
        }
        if (roomPrev.screen.xOffset > 0) {
            ctx.clearRect(0,0,Math.ceil(roomPrev.screen.xOffset), canvas.height);
            ctx.clearRect(roomPrev.screen.xOffset + roomPrev.screen.width,0,Math.ceil(roomPrev.screen.xOffset), canvas.height);
        }

    };
    */

    var offscreen, offscreenCtx;
    my.drawRoomFullScreen = function(room, post) {

        if (my.needsResize) {
            my.needsResize = false;
            fullscreen();
        }

        // *** DRAW TO VIRTUAL SCREEN ***

        // should only be needed once
        if (!room.backgroundImage) createRoomBackground(room);

        // Create the offscreen canvas if need be
        // Should only be the first time throgh
        if (!offscreen) {
            offscreen = document.createElement('canvas');
            offscreen.width = virtualWidth;
            offscreen.height = virtualHeight;
            offscreenCtx = offscreen.getContext('2d');
        }

        // draw the room

        var xOffset = Math.floor((virtualWidth - room.rect.width)/2);
        var yOffset = Math.floor((virtualHeight - room.rect.height));

        // black out the sides
        offscreenCtx.fillStyle = 'black';
        // left
        offscreenCtx.fillRect(0, yOffset, xOffset, room.rect.height);
        // right
        offscreenCtx.fillRect(xOffset + room.rect.width, yOffset, xOffset, room.rect.height);
        // top
        offscreenCtx.fillRect(0, 0, virtualWidth, yOffset);

        offscreenCtx.save();
        offscreenCtx.translate(xOffset, yOffset);
        drawRoom(offscreenCtx, room, 0, 0);
        offscreenCtx.restore();

        if (post) post(offscreenCtx);

        // *** DRAW TO SCREEN ***

        // draw to the onscreen canvas
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(offscreen, 0, 0, offscreen.width, offscreen.height, drawOffset.x, drawOffset.y, drawWidth, drawHeight);
    };

    var drawRoom = function(ctx, room) {

        // draw to the real screen
        ctx.drawImage(room.backgroundImage, 0, 0);

        // now the entities
        for (var i = room.entities.length-1; i >= 0; i--) {
            room.entities[i].drawEntity(ctx);
        }
    };



    var textMap = {
        "a": 0,
        "b": 1,
        "c": 2,
        "d": 3,
        "e": 4,
        "f": 5,
        "g": 6,
        "h": 7,
        "i": 8,
        "j": 9,
        "k": 10,
        "l": 11,
        "m": 12,
        "n": 13,
        "o": 14,
        "p": 15,
        "q": 16,
        "r": 17,
        "s": 18,
        "t": 19,
        "u": 20,
        "v": 21,
        "w": 22,
        "x": 23,
        "y": 24,
        "z": 25,

        "-": 26,
        ".": 27,
        ",": 28,
        "!": 29,
        "'": 30,
        "&": 31,
        "?": 32,

        "0": 33,
        "1": 34,
        "2": 35,
        "3": 36,
        "4": 37,
        "5": 38,
        "6": 39,
        "7": 40,
        "8": 41,
        "9": 42
    };

    my.drawText = function(ctx, text, x, y) {

        ctx.fillStyle="#000000";
        ctx.fillRect(x, y, text.length * 8, 8);

        for (var i = 0; i < text.length; i++) {

            var char = textMap[text[i]];
            if (typeof char === "undefined") char = 43;

            var sprite = SpriteSheets.letters.sprites[char];
            sprite.drawSprite(ctx, x + i*8, y);
        }


    };









    return my;
})();



