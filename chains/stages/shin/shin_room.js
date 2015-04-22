define([
    'core/model/rooms/room',
    'view/sprite_sheet',
    'controller/load_rooms'

], function(
    Room,
    SpriteSheet,
    LoadRooms,
    Edge
) {

    var defaultImage = SpriteSheet({url:'chains/stages/shin/images/desert.png', map:[{x: 0, y: 0, width: 256, height: 176}]});
    var defaultOverlay = SpriteSheet({url:'chains/stages/shin/images/desert_map.png', map:[{x: 0, y: 0, width: 256, height: 176}]});

    var DesertRoom = function (Monster, randomPosition, image, overlay) {

        var data = LoadRooms.loadRoomJsonFromOverlay(image || defaultImage, overlay || defaultOverlay, 'first');
        var my = Room(data);

        my.title = "room";

        var addMonster = function() {
            var e = Monster();
            if (randomPosition) my.addEntityAtOpenTile(e);
            else {my.addEntity(e);}

            e.onDeath = function() {
                my.setFrameTimeout(60, addMonster);
                my.setFrameTimeout(120, addMonster);
            }
        };


        var next, slideInfo;

        my.slideRoomLeft = function(nextRoom) {

            next = nextRoom;

            slideInfo = {
                totalFrames: 60,
                drawnFrames: 0,
                x: -my.rect.width,
                y: 0
            };

            slide();

            my.parent.addRoom(next);

            next.pause();
            my.pause();

            transferPlayers(next, Directions.left);

        };

        my.slideRoomDown = function(nextRoom) {

            next = nextRoom;

            slideInfo = {
                totalFrames: 60,
                drawnFrames: 0,
                x: 0,
                y: my.rect.height
            };

            slide();

            my.parent.addRoom(next);

            next.pause();
            my.pause();

            transferPlayers(next, Directions.bottom);

        };

        var slide = function() {

            if (!slideInfo) return;

            slideInfo.drawnFrames++;

            if (slideInfo.drawnFrames == slideInfo.totalFrames) {
                next.drawOffset.x = 0;
                my.drawOffset.x = slideInfo.x;

                next.drawOffset.y = 0;
                my.drawOffset.y = slideInfo.y;

                next.resume();
                slideInfo = null;
            }
            else {
                var p = slideInfo.drawnFrames / slideInfo.totalFrames;

                if (slideInfo.x < 0) {
                    var xDiff = slideInfo.x * p;
                    next.drawOffset.x = xDiff + my.rect.width;
                    my.drawOffset.x = xDiff;
                }

                if (slideInfo.y > 0) {
                    var yDiff = slideInfo.y * p;
                    next.drawOffset.y = yDiff - my.rect.height;
                    my.drawOffset.y = yDiff;
                }

            }

        };

        my.executePreFrame = function() {
            slide();
        };


        function transferPlayers(destinationRoom, placement) {

            // first get the players
            var players = my.getPlayers();

            // then add them to valid spots in the room
            for (var i = 0; i < players.length; i++) {

                var player = players[i];

                // Allow start if possible
                if (!players[i].isDead) {
                    switch (placement) {
                        case Directions.left:
                            player.position.x = 0;
                            destinationRoom.addEntity(player);
                            break;
                        case Directions.bottom:
                            player.position.y = destinationRoom.rect.height - player.footPrints.default.height;
                            destinationRoom.addEntity(player);
                            break;
                        default:
                            destinationRoom.addEntityAtOpenTile(player);
                    }

                    my.removeEntity(players[i]);
                }

            }
        }



        if (Monster) {
            // add the monster after a second
            my.setFrameTimeout(60, function () {
                //my.title = "boss";
                addMonster();
            });
        }

        return my;
    };

    return DesertRoom;
});