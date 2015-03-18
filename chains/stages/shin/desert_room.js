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
            next.drawOffset.x = 256;

            my.addRoom(next);

            slideRight();

            //my.removeEntity(player);

            next.transferPlayers(my);

        }));

        var next;

        var slideRight = function() {

            next.drawOffset.x -= 2;
            my.drawOffset.x -= 2;

            if (next.drawOffset.x > 0) {
                my.setFrameTimeout(1, slideRight);
            }

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