define(function() {

    var my = {};

    var createRoomBackground = function (room) {

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


    my.drawRoom = function (ctx, xOffset, yOffset, room) {

        // should only be needed once
        if (!room.backgroundImage) createRoomBackground(room);

        ctx.save();
        ctx.translate(xOffset, yOffset);

        // draw to the real screen
        ctx.drawImage(room.backgroundImage, 0, 0);

        // now the entities
        for (var i = room.entities.length - 1; i >= 0; i--) {
            room.entities[i].drawEntity(ctx);
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

    my.drawText = function (ctx, text, x, y) {

        ctx.fillStyle = "#000000";
        ctx.fillRect(x, y, text.length * 8, 8);

        for (var i = 0; i < text.length; i++) {

            var char = textMap[text[i]];
            if (typeof char === "undefined") char = 43;

            var sprite = SpriteSheets.letters.sprites[char];
            sprite.drawSprite(ctx, x + i * 8, y);
        }


    };

    return my;

});