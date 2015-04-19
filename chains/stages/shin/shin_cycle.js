define([
    'jquery',
    'chains/stages/shin/rooms/desert',
    'chains/stages/shin/skull_room',
    'chains/demo_draw',
    'core/model/entity/player',
    'controller/input'
], function(
    $,
    DesertRoom,
    SkullRoom,
    DemoDraw,
    Player,
    PlayerInput
) {

    return function(options) {

        var my = {
            virtualWidth: 342,
            virtualHeight: 192
        };

        // standard room size
        var roomWidth = 256;
        var roomHeight = 176;

        // where to draw the room
        var xOffset = Math.floor((my.virtualWidth - roomWidth)/2);
        var yOffset = Math.floor((my.virtualHeight - roomHeight));


        var rooms = [];

        my.addRoom = function(room) {
            rooms.push(room);
            room.parent = my;
        };

        // load the specified room
        if (!options.room) {
            var room = DesertRoom(options.Monster, true);
            my.addRoom(room);
        }
        else if (options.room == 'talkingSkulls') {
            var room = SkullRoom();
            my.addRoom(room);
        }


        // guaranteed one call per 16ms
        my.processFrame = function() {


            if (rooms.length > 0) checkForPlayerAdd();

            for (var i = 0; i < rooms.length; i++) {
                // Give the room a frame of animation
                rooms[i].executeFrame();
            }

        };

        // one call per animation call from window
        my.drawFrame = function(ctx) {

            if (rooms.length == 0) {
                //DrawText.drawText(ctx, "loading", 64, 64);
                return;
            }

            for (var i = 0; i < rooms.length; i++) {
                // draw the room
                rooms[i].drawRoom(ctx, xOffset, yOffset);
            }

            drawMenu(ctx);
        };

        var drawMenu = function(ctx) {
            // black out the sides
            ctx.fillStyle = 'black';
            // left
            ctx.fillRect(0, yOffset, xOffset, my.virtualHeight);
            // right
            ctx.fillRect(my.virtualWidth - xOffset, yOffset, xOffset, my.virtualHeight);
            // top
            ctx.fillRect(0, 0, my.virtualWidth, yOffset);

            // draw the arcade overlay
            DemoDraw.drawInfo(ctx, my.players, rooms[0], my.virtualWidth, my.virtualHeight);
        };



        // *** Players ***
        my.players = [];

        function createPlayer(playerId, playerInputIndex) {
            var p = Player(playerId, playerInputIndex);
            my.players[playerId] = p;

            //p.addAltAction(DropBomb(p, LiveBomb));
            //p.addAltAction(ThrowBoomerang(p));

            rooms[0].addEntityAtOpenTile(p);

        }

        function checkForPlayerAdd() {
            // check for player creation
            for (var i = 0; i < PlayerInput.length; i++) {
                if (!PlayerInput[i]) continue;

                if (PlayerInput[i].start) {

                    var playerId = PlayerInput[i].playerId;

                    // create playerId
                    if (typeof playerId === 'undefined') {
                        var max = -1;
                        for (var j = 0; j < PlayerInput.length; j++) {
                            if (PlayerInput[j] && typeof PlayerInput[j].playerId !== 'undefined')
                                max = PlayerInput[j].playerId > max ? PlayerInput[j].playerId : max;
                        }
                        playerId = max + 1;
                        PlayerInput[i].playerId = playerId;
                    }

                    // Allow start if possible
                    if (!my.players[playerId] || my.players[playerId].isDead) {
                        createPlayer(playerId, i);
                    }
                }
            }
        }


        return my;
    };
});