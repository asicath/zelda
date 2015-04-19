define([
    'jquery',
    'arcade/demo_room',
    'arcade/store_room',
    'arcade/demo_draw',
    'arcade/logo',
    'controller/load_rooms',
    'core/model/directives',
    'view/sprite_sheet',
    'controller/input',
    'core/model/entity/player'
], function(
    $,
    DemoRoom,
    StoreRoom,
    DemoDraw,
    Logo,
    LoadRooms,
    Directives,
    SpriteSheet,
    PlayerInput,
    Player
) {

    var roomImage = SpriteSheet({url:'core/assets/rooms/cave.gif', map:[{x: 0, y: 0, width: 256, height: 176}]});
    var roomOverlay = SpriteSheet({url:'core/assets/rooms/cave_overlay.gif', map:[{x: 0, y: 0, width: 256, height: 176}]});

    return function() {

        var my = {
            virtualWidth: 342,
            virtualHeight: 192
        };

        var room = null;
        var previousRoom;
        var loading = false;
        var xOffset, yOffset;
        var treasureRoomCount = 0;


        var onSuccess = function(loadedRoom) {
            if (previousRoom) {
                transferPlayers(previousRoom, loadedRoom);
            }

            room = loadedRoom;
            room.parent = my;
            loading = false;
            xOffset = Math.floor((my.virtualWidth - room.rect.width)/2);
            yOffset = Math.floor((my.virtualHeight - room.rect.height));
            room.onComplete = nextRoom;
        };

        // guaranteed one call per 16ms
        my.processFrame = function() {

            // check for adding a player at the top
            checkForPlayerAdd();

            if (room != null) {
                // Give the room a frame of animation
                room.executeFrame();
                return;
            }
            else if (loading) {
                // wait
                return;
            }

            // needs a new room
            var roomType = null;

            if (++treasureRoomCount > 1) {
                treasureRoomCount = 0;
                roomType = StoreRoom;

                var data = LoadRooms.loadRoomJsonFromOverlay(roomImage, roomOverlay, 'first');
                room = roomType(data);
                room.title = "store";

                Directives.nextMessage(3);

                onSuccess(room);
            }
            else {
                roomType = DemoRoom;

                loadRoom(null, null, roomType, onSuccess);
                loading = true;

                Directives.nextMessage(-1);
            }



        };



        var nextRoom = function() {
            previousRoom = room;
            room = null;
        };


        // one call per animation call from window
        my.drawFrame = function(ctx) {

            if (!room) {
                //DrawText.drawText(ctx, "loading", 64, 64);
                return;
            }

            drawMenu(ctx);

            // draw the room
            room.drawRoom(ctx, xOffset, yOffset);

        };

        var drawMenu = function(ctx) {
            // black out the sides
            ctx.fillStyle = 'black';
            // left
            ctx.fillRect(0, yOffset, xOffset, room.rect.height);
            // right
            ctx.fillRect(xOffset + room.rect.width, yOffset, xOffset, room.rect.height);
            // top
            ctx.fillRect(0, 0, my.virtualWidth, yOffset);

            // draw the arcade overlay
            DemoDraw.drawInfo(ctx, my, room, my.virtualWidth, my.virtualHeight);
        };

        var loadRoom = function(x, y, type, success) {

            // generate random if not specified
            if (x == null || y == null) {
                var c = getRandomRoomCoords();
                x = c.x;
                y = c.y;
            }

            if (x.length == 1) x = "0" + x;
            if (y.length == 1) y = "0" + y;

            LoadRooms.loadRoomJson('', requirejs.s.contexts._.config.baseUrl + 'core/assets/rooms/ow' + x + '-' + y + '.js', function(data) {
                var room = type(data);
                room.title = "room " + x + "-" + y;
                success(room);
            });

        };

        var invalidRooms = [
            // split
            {x:3, y:2},
            {x:13, y:1},
            {x:12, y:5},
            {x:12, y:6},
            {x:5, y:5},
            {x:2, y:6},
            {x:13, y:6},
            {x:7, y:2},
            {x:11, y:4},
            {x:5, y:7},
            {x:2, y:7},
            {x:7, y:1},

            // too small
            {x:6, y:4},
            {x:14, y:0},
            {x:6, y:3},
            {x:15, y:7},
            {x:0, y:0},
            {x:9, y:1},
            {x:2, y:0},
            {x:3, y:0},
            {x:7, y:0}
        ];

        var getRandomRoomCoords = function() {
            var validRoom = false;
            var c;
            while (!validRoom) {
                c = {
                    x: Math.floor(Math.random() * 16).toString(),
                    y: Math.floor(Math.random() * 8).toString()
                };
                validRoom = true;
                for (var i = 0; i < invalidRooms.length; i++) {
                    if (c.x == invalidRooms[i].x && c.y == invalidRooms[i].y) {
                        validRoom = false;
                        break;
                    }
                }
            }

            return c;
        };







        // *** Players ***
        my.players = [];

        function createPlayer(playerId, playerInputIndex) {
            var p = Player(playerId, playerInputIndex);
            my.players[playerId] = p;

            //p.addAltAction(DropBomb(p, LiveBomb));
            //p.addAltAction(ThrowBoomerang(p));

            room.addEntityAtOpenTile(my.players[playerId]);

            // advance message
            Directives.nextMessage(0);
        }

        function transferPlayers(sourceRoom, destinationRoom) {
            // first get the players
            var players = sourceRoom.getPlayers();

            // then add them to valid spots in the room
            for (var i = 0; i < players.length; i++) {
                // Allow start if possible
                if (!players[i].isDead) {
                    destinationRoom.addEntityAtOpenTile(players[i]);
                }
            }
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