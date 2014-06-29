
var DemoDraw = (function() {
    var my = {};

    my.drawInfo = function(ctx, room) {
        // Optional draws
        if (room.wave) {
            View.drawText(ctx, " wave " + room.wave.toString() + " ", 96, 4);
        }

        if (room.players) {
            displayPlayerInfo(ctx, 0, 4, room.players[0]);
            displayPlayerInfo(ctx, 1, 172, room.players[1]);
        }
    };

    var displayPlayerInfo = function(ctx, playerId, x, player) {

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
            Sprites.heart[index].draw(ctx, x + (i/4)*8, y, Palettes.DeathStarRedBlue);
            i-=4;
        }

        y+=8;
        View.drawText(ctx, " x" + (player.rupees || 0) + "", x, y);
        Sprites.icons[0].draw(ctx, x, y, Palettes.Icon);

        View.drawText(ctx, " x" + (player.bombs || 0) + "", x+8*6, y);
        Sprites.icons[2].draw(ctx, x+8*6, y, Palettes.IconBlue);

    };

    return my;
})();

