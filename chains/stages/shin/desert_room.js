define([
    'dev/player_room',
    'view/sprite_sheet',
    'controller/load_rooms'
], function(
    PlayerRoom,
    SpriteSheet,
    LoadRooms
) {

    var desertImage = SpriteSheet({url:'chains/stages/shin/images/desert.png', map:[{x: 0, y: 0, width: 256, height: 176}]});
    var desertOverlay = SpriteSheet({url:'chains/stages/shin/images/desert_map.png', map:[{x: 0, y: 0, width: 256, height: 176}]});

    return function (Monster, randomPosition) {

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

        if (Monster) {
            // add the monster after a second
            my.setFrameTimeout(60, function () {
                //my.title = "boss";
                addMonster();
            });
        }

        return my;
    };

});