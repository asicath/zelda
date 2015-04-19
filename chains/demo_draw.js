define(['view/draw', 'view/sprite_sheet'], function(DrawText, SpriteSheet) {

    var my = {};

    var heart = SpriteSheet({url: "core/assets/sprites/heart.png"});
    var icons = SpriteSheet({url: "core/assets/sprites/icons.png"});
    var weaponBorder = SpriteSheet({url: "core/assets/sprites/weapon_border.png"});
    var weaponIcons = SpriteSheet({url: "core/assets/sprites/weapon_icons.png", width:14});

    my.drawInfo = function (ctx, players, room, virtualWidth, virtualHeight) {

        // Optional draws
        if (players) {
            displayPlayerInfo(ctx, 0, 2, 16, players[0]);
            displayPlayerInfo(ctx, 1, virtualWidth - 5 * 8 - 1, 16, players[1]);

            displayPlayerInfo(ctx, 2, 2, ((virtualHeight - 16) / 2) + 16, players[2]);
            displayPlayerInfo(ctx, 3, virtualWidth - 5 * 8 - 1, ((virtualHeight - 16) / 2) + 16, players[3]);
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
            heart.sprites[index].drawSprite(ctx, x + (i / 4) * 8 - 8, y);
            i -= 4;
        }

        y += 8;
        DrawText.drawText(ctx, " x" + (player.rupees || 0), x, y);
        icons.sprites[0].drawSprite(ctx, x, y);

        y += 8;
        DrawText.drawText(ctx, " x" + (player.bombs || 0), x, y);
        icons.sprites[2].drawSprite(ctx, x, y);

        y += 8;


        weaponBorder.sprites[0].drawSprite(ctx, x, y + 3);
        DrawText.drawText(ctx, "b", x + 5, y);
        weaponIcons.sprites[2].drawSprite(ctx, x + 2, y + 5);


        weaponBorder.sprites[0].drawSprite(ctx, x + 21, y + 3);
        DrawText.drawText(ctx, "a", x + 26, y);

        if (player.altWeaponIconIndex > -1) {
            weaponIcons.sprites[player.altWeaponIconIndex].drawSprite(ctx, x + 2 + 21, y + 5);
        }


    };

    return my;

});
