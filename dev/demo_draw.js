define(['view/draw'], function(DrawText) {

    var my = {};

    my.drawInfo = function (ctx, room, virtualWidth, virtualHeight) {

        // Optional draws
        if (room.players) {
            displayPlayerInfo(ctx, 0, 2, 16, room.players[0]);
            displayPlayerInfo(ctx, 1, virtualWidth - 5 * 8 - 1, 16, room.players[1]);

            displayPlayerInfo(ctx, 2, 2, ((virtualHeight - 16) / 2) + 16, room.players[2]);
            displayPlayerInfo(ctx, 3, virtualWidth - 5 * 8 - 1, ((virtualHeight - 16) / 2) + 16, room.players[3]);
        }

        // Top screen info
        if (room.title) {
            DrawText.drawText(ctx, room.title, (virtualWidth - room.title.length * 8) / 2, 0);
        }
    };

    var displayPlayerInfo = function (ctx, playerId, x, y, player) {

        if (!player) {
            return;
        }

        //var y = 16;
        //DrawText.drawText(ctx, "playr " + (playerId + 1).toString(), x, y);
        //y+=8;

        DrawText.drawText(ctx, "kills", x, y);
        y += 8;
        DrawText.drawText(ctx, player.monstersKilled.toString(), x + 40 - player.monstersKilled.toString().length * 8, y);

        y += 8;
        var i = player.maxLife;
        ctx.fillStyle = "#000000";

        while (i > 0) {
            var index = 0;
            if (i > player.life) {
                if (i - player.life == 2) {
                    index = 1;
                }
                else {
                    index = 2;
                }
            }
            SpriteSheets.heart.sprites[index].drawSprite(ctx, x + (i / 4) * 8 - 8, y);
            i -= 4;
        }

        y += 8;
        DrawText.drawText(ctx, " x" + (player.rupees || 0), x, y);
        SpriteSheets.icons.sprites[0].drawSprite(ctx, x, y);

        y += 8;
        DrawText.drawText(ctx, " x" + (player.bombs || 0), x, y);
        SpriteSheets.icons.sprites[2].drawSprite(ctx, x, y);

        y += 8;


        SpriteSheets.weaponBorder.sprites[0].drawSprite(ctx, x, y + 3);
        DrawText.drawText(ctx, "b", x + 5, y);
        SpriteSheets.weaponIcons.sprites[2].drawSprite(ctx, x + 2, y + 5);


        SpriteSheets.weaponBorder.sprites[0].drawSprite(ctx, x + 21, y + 3);
        DrawText.drawText(ctx, "a", x + 26, y);

        if (player.altWeaponIconIndex > -1) {
            SpriteSheets.weaponIcons.sprites[player.altWeaponIconIndex].drawSprite(ctx, x + 2 + 21, y + 5);
        }


    };

    return my;

});
