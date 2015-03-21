define([
    'dev/player_room',
    'view/sprite_sheet',
    'controller/load_rooms',
    'core/model/entity/edge'
], function(
    PlayerRoom,
    SpriteSheet,
    LoadRooms,
    Edge
) {

    var desertImage = SpriteSheet({url:'chains/stages/shin/images/desert.png', map:[{x: 0, y: 0, width: 256, height: 176}]});
    var desertOverlay = SpriteSheet({url:'chains/stages/shin/images/desert_map.png', map:[{x: 0, y: 0, width: 256, height: 176}]});

    var DesertRoom = function (Monster, randomPosition) {

        var data = LoadRooms.loadRoomJsonFromOverlay(desertImage, desertOverlay, 'first');
        var my = PlayerRoom(data);

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

            next.transferPlayers(my);

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