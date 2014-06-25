
var View = (function() {
    var my = {};

    var canvas, ctx;

    my.needsResize = true;

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

        // Set width and height
        if (c.attr('width') != container.width()) { c.attr('width', container.width()); }
        if (c.attr('height') != container.height()) { c.attr('height', container.height()); }

        c.css('width', container.width());
        c.css('height', container.height());
    };

    var setSize = function(room, maxWidth, maxHeight) {

        // find the maximum screen size
        var factor = Math.min(maxWidth / room.rect.width, maxHeight / room.rect.height);
        room.screen = {
            drawWidth: Math.floor(room.rect.width * factor),
            drawHeight: Math.floor(room.rect.height * factor),
            width: Math.floor(room.rect.width),
            height: Math.floor(room.rect.height),
            factor: 1
        };

        // find center for later
        room.screen.xOffset = Math.abs(room.screen.drawWidth - maxWidth) / 2;
        room.screen.yOffset = Math.abs(room.screen.drawHeight - maxHeight) / 2;



        // Create the virtual screen
        var buffer = document.createElement('canvas');
        buffer.width = room.rect.width;
        buffer.height = room.rect.height;
        var ctxBuffer = buffer.getContext('2d');

        // actually draw the sprites
        if (room.backgroundSprite) {
            View.drawSprite(ctxBuffer, room.backgroundSprite[0], 0, 0, Palettes.Default);
        }
        else {
            // draw to the virtual screen
            var palettes = [Palettes.OutsideGreen, Palettes.OutsideBrown, Palettes.OutsideGrey, Palettes.AllBlack];
            var i = 0;
            while (i < room.tiles.length) {
                var t = room.tiles[i];
                View.drawSprite(ctxBuffer, room.sprites[t.index], t.x, t.y, palettes[t.palette]);
                i++;
            }
        }

        room.screen.sizedImage = buffer;

        
    };


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

    var offscreen, offscreenCtx;
    my.drawRoomFullScreen = function(room) {

        if (my.needsResize) {
            room.screen = null;
            my.needsResize = false;
            fullscreen();
        }

        if (!room.screen) {
            setSize(room, canvas.width, canvas.height);

            offscreen = document.createElement('canvas');
            offscreen.width = room.screen.width;
            offscreen.height = room.screen.height;
            offscreenCtx = offscreen.getContext('2d');
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

        /*
        room.screen = {
            drawWidth: Math.floor(room.rect.width * factor),
            drawHeight: Math.floor(room.rect.height * factor),
            width: Math.floor(room.rect.width),
            height: Math.floor(room.rect.height),
            factor: 1
        };
        */

        // draw the room
        drawRoom(offscreenCtx, room, 0, 0);

        //ctx.drawImage(offscreen, 0, 0);

        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(offscreen, 0, 0, offscreen.width, offscreen.height, room.screen.xOffset, room.screen.yOffset, room.screen.drawWidth, room.screen.drawHeight);
    };

    var drawRoom = function(ctx, room) {
        // draw to the real screen
        ctx.drawImage(room.screen.sizedImage, 0, 0);

        // now the entities
        for (var i = room.entities.length-1; i >= 0; i--) {
            drawEntity(ctx, room.entities[i]);
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

            var sprite = Sprites.letters[char];
            View.drawSprite(ctx, sprite, x + i*8, y, Palettes.Text);
        }


    };

    var drawEntity = function(ctx, entity) {
        // todo allow for multiple icons per entity
        if (!entity.icon) return;
        drawIcon(ctx, entity.icon);
    };

    var drawIcon = function(ctx, icon) {
        if (icon.isVisible())
            View.drawSprite(ctx, icon.getSprite(), icon.getXPosition(), icon.getYPosition(), icon.getPalette());
    };





    return my;
})();



