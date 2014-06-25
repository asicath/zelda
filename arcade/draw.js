
var DemoDraw = (function() {
    var my = {};

    my.drawInfo = function(ctx, room) {
        ctx.save();
        ctx.translate(room.screen.xOffset, room.screen.yOffset);

        // Optional draws
        if (room.wave) {
            //View.drawText(ctx, " wave " + room.wave.toString() + " ", 96, 4);
        }

        if (room.players) {
            //displayPlayerInfo(ctx, 0, 4, room.players[0]);
            //displayPlayerInfo(ctx, 1, 172, room.players[1]);
        }

        ctx.restore();
    };

    var displayPlayerInfo = function(ctx, playerId, x, player) {

        //var player = currentRoom.players[playerId];

        if (!player) {
            return;
        }

        var y = 0;
        View.drawText(ctx, " player " + (playerId + 1).toString() + " ", x, y);

        y+=8;
        View.drawText(ctx, " killed " + player.monstersKilled.toString() + " ", x, y);

        y+=8;
        var i = player.maxLife;
        ctx.fillStyle="#000000";
        ctx.fillRect(x, y, ((i / 4)+2) * 8, 8);

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
            View.drawSprite(ctx, Sprites.heart[index], x + (i/4)*8, y, Palettes.DeathStarRedBlue);
            i-=4;
        }

        y+=8;
        View.drawText(ctx, " x" + (player.rupees || 0) + "", x, y);
        View.drawSprite(ctx, Sprites.icons[0], x, y, Palettes.Icon);

        View.drawText(ctx, " x" + (player.bombs || 0) + "", x+8*6, y);
        View.drawSprite(ctx, Sprites.icons[2], x+8*6, y, Palettes.IconBlue);

    };

    return my;
})();

