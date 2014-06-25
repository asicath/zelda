
var View = (function() {
    var my = {};

    var canvas, ctx;

    my.needsResize = true;

    // ensure the canvas is taking up the whole parent
    my.fullscreen = function() {

        canvas = document.getElementById('img');
        ctx = canvas.getContext('2d');
        my.ctx = ctx;

        var container = $(canvas).parent();
        var c = $(canvas);

        // Set width and height
        if (c.attr('width') != container.width()) { c.attr('width', container.width()); }
        if (c.attr('height') != container.height()) { c.attr('height', container.height()); }
    };

    var setSize = function(room, maxWidth, maxHeight) {

        // find the maximum screen size
        var factor = Math.min(maxWidth / room.rect.width, maxHeight / room.rect.height);
        room.screen = {
            width: Math.floor(room.rect.width * factor),
            height: Math.floor(room.rect.height * factor),
            factor: factor
        };

        // find center for later
        room.screen.xOffset = Math.abs(room.screen.width - maxWidth) / 2;
        room.screen.yOffset = Math.abs(room.screen.height - maxHeight) / 2;

        // Create the virtual screen
        var upscaleFactor = Math.ceil(factor); // must be integer
        var buffer = document.createElement('canvas');
        buffer.width = room.rect.width * upscaleFactor;
        buffer.height = room.rect.height * upscaleFactor;
        var ctxBuffer = buffer.getContext('2d');

        // actually draw the sprites
        if (room.backgroundSprite) {
            View.drawSprite(ctxBuffer, upscaleFactor, room.backgroundSprite[0], 0, 0, Palettes.Default);
        }
        else {
            // draw to the virtual screen
            var palettes = [Palettes.OutsideGreen, Palettes.OutsideBrown, Palettes.OutsideGrey, Palettes.AllBlack];
            var i = 0;
            while (i < room.tiles.length) {
                var t = room.tiles[i];
                View.drawSprite(ctxBuffer, upscaleFactor, room.sprites[t.index], t.x, t.y, palettes[t.palette]);
                i++;
            }
        }


        // downscale to exact screen size
        var resize = document.createElement('canvas');
        resize.width = room.screen.width;
        resize.height = room.screen.height;
        ctxBuffer = resize.getContext('2d');
        ctxBuffer.drawImage(buffer, 0, 0, room.screen.width, room.screen.height);

        room.screen.sizedImage = resize;
    };


    my.drawRoomTransition = function(roomPrev, roomNext, percent, direction) {

        if (my.needsResize) {
            roomPrev.screen = null;
            roomNext.screen = null;
            my.needsResize = false;
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


    my.drawRoomFullScreen = function(room) {

        if (my.needsResize) {
            room.screen = null;
            my.needsResize = false;
        }

        if (!room.screen) {
            setSize(room, canvas.width, canvas.height);
        }

        // Clear top and bottom
        if (room.screen.yOffset > 0) {
            ctx.clearRect(0,0,canvas.width,Math.ceil(room.screen.yOffset));
            ctx.clearRect(0, room.screen.yOffset + room.screen.height,canvas.width,Math.ceil(room.screen.yOffset));
        }
        if (room.screen.xOffset > 0) {
            ctx.clearRect(0,0,Math.ceil(room.screen.xOffset), canvas.height);
            ctx.clearRect(room.screen.xOffset + room.screen.width,0,Math.ceil(room.screen.xOffset), canvas.height);
        }

        // draw the room
        drawRoom(ctx, room, 0, 0);

    };

    var drawRoom = function(ctx, room, xOffset, yOffset) {
        ctx.save();
        ctx.translate(room.screen.xOffset + xOffset, room.screen.yOffset + yOffset);

        // draw to the real screen
        ctx.drawImage(room.screen.sizedImage, 0, 0);

        // now the entities
        for (var i = room.entities.length-1; i >= 0; i--) {
            drawEntity(ctx, room.entities[i], room.screen.factor);
        }

        ctx.restore();
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

    my.drawText = function(ctx, text, x, y, factor) {

        //
        ctx.fillStyle="#000000";
        ctx.fillRect(x * factor, y * factor, text.length * factor * 8, 8 * factor);

        for (var i = 0; i < text.length; i++) {

            var char = textMap[text[i]];
            if (typeof char === "undefined") char = 43;

            var sprite = Sprites.letters[char];
            View.drawSprite(ctx, factor, sprite, x + i*8, y, Palettes.Text);
        }


    };

    var drawEntity = function(ctx, entity, factor) {
        // todo allow for multiple icons per entity
        if (!entity.icon) return;
        drawIcon(ctx, entity.icon, factor);
    };

    var drawIcon = function(ctx, icon, factor) {
        if (icon.isVisible())
            View.drawSprite(ctx, factor, icon.getSprite(), icon.getXPosition(), icon.getYPosition(), icon.getPalette());
    };





    return my;
})();



