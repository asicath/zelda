var Sword = function(facing, player) {
    var my = Entity();

    my.sprites = Sprites.sword;
    my.palette = Palettes.MonsterBlue;

    var rects = null;
    var swordWidth = 8;
    var swordLength = 16;

    var swordTick = 0;


    // Init sword based on facing
    (function() {

        var start;


        switch (facing) {
            case Directions.top:
                start = {
                    x: player.rect.x + 3,
                    y: player.rect.y - 12
                };
                rects = [
                    new Rect(start.x, start.y,     swordWidth, swordLength),
                    new Rect(start.x, start.y + 4, swordWidth, swordLength),
                    new Rect(start.x, start.y + 8, swordWidth, swordLength)
                ];
                my.spriteIndex = 0;
                break;
            case Directions.bottom:
                start = {
                    x: player.rect.x + 5,
                    y: player.rect.y + 11 // 11?
                };
                rects = [
                    new Rect(start.x, start.y,     swordWidth, swordLength),
                    new Rect(start.x, start.y - 4, swordWidth, swordLength),
                    new Rect(start.x, start.y - 8, swordWidth, swordLength)
                ];
                my.spriteIndex = 1;
                break;
            case Directions.left:
                start = {
                    x: player.rect.x - 12,
                    y: player.rect.y + 5
                };
                rects = [
                    new Rect(start.x,     start.y, swordLength, swordWidth),
                    new Rect(start.x + 4, start.y, swordLength, swordWidth),
                    new Rect(start.x + 8, start.y, swordLength, swordWidth)
                ];
                my.spriteIndex = 2;
                break;
            case Directions.right:
                start = {
                    x: player.rect.x + 12,
                    y: player.rect.y + 5
                };
                rects = [
                    new Rect(start.x,     start.y, swordLength, swordWidth),
                    new Rect(start.x - 4, start.y, swordLength, swordWidth),
                    new Rect(start.x - 8, start.y, swordLength, swordWidth)
                ];
                my.spriteIndex = 3;
                break;
        }

        my.rect = rects[0];
    })();

    var slow = 1;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        executeFrame_parent(room); // doesn't do anything?

        // 14 ticks to complete sword thrust
        // 14 - Take sword stance
        // 10 - Sword goes all the way out
        // 02 - Relax stance, sword moves back slightly
        // 01 - Sword moves back, tip showing. foot change.
        // 00 - Sword gone.

        swordTick++;



        if (swordTick == 9 * slow) {
            // pull sword back slightly
            my.rect = rects[1];
        }

        if (swordTick == 10 * slow) {
            // pull sword back mostly, just tip showing.  change foot of stance
            my.rect = rects[2];

            // set to remove so its gone next frame
        }

        // Process Sword events
        if (swordTick == 11 * slow) {
            // Remove sword from room
            room.removeAfterFrame.push(my);

            my.done = true;
        }

    };


    return my;
};