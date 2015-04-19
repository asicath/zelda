define([
    'core/model/rooms/room',
    'view/sprite_sheet',
    'controller/load_rooms',
    'core/model/entity/edge'
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

        my.title = "dessert";

        var addMonster = function() {
            var e = Monster();
            if (randomPosition) my.addEntityAtOpenTile(e);
            else {my.addEntity(e);}

            e.onDeath = function() {
                my.setFrameTimeout(60, addMonster);
                my.setFrameTimeout(120, addMonster);
            }
        };

        var complete = false;

        my.addEntity(Edge(Directions.right, function (player) {

            if (complete) return;

            complete = true;

            next = DesertRoom(Monster, randomPosition);

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

            transferPlayers(next);

        }));

        var next, slideInfo;

        var slide = function() {

            if (!slideInfo) return;

            slideInfo.drawnFrames++;

            if (slideInfo.drawnFrames == slideInfo.totalFrames) {
                next.drawOffset.x = 0;
                my.drawOffset.x = slideInfo.x;
                next.resume();
                slideInfo = null;
            }
            else {
                var p = slideInfo.drawnFrames / slideInfo.totalFrames;
                var xDiff = slideInfo.x * p;
                var yDiff = slideInfo.y * p;

                next.drawOffset.x = xDiff + my.rect.width;
                my.drawOffset.x = xDiff;
            }

        };

        my.executePreFrame = function() {
            slide();
        };


        function transferPlayers(destinationRoom) {

            // first get the players
            var players = my.getPlayers();

            // then add them to valid spots in the room
            for (var i = 0; i < players.length; i++) {
                // Allow start if possible
                if (!players[i].isDead) {
                    destinationRoom.addEntityAtOpenTile(players[i]);
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