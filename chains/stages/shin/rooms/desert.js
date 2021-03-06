define([
    'chains/stages/shin/shin_room',
    'view/sprite_sheet',
    'core/model/entity/edge',
    'chains/stages/shin/rooms/pyramid_edge'
], function(
    ShinRoom,
    SpriteSheet,
    Edge,
    PyramidEdge
) {

    var image = SpriteSheet({url:'chains/stages/shin/images/shin_level_backs/shin1.png', map:[{x: 0, y: 0, width: 256, height: 176}]});
    var overlay = SpriteSheet({url:'chains/stages/shin/images/desert_map.png', map:[{x: 0, y: 0, width: 256, height: 176}]});

    var DesertRoom = function (Monster, randomPosition) {

        var my = ShinRoom(Monster, randomPosition, image, overlay);

        my.title = "desert";


        var complete = false;
        my.addEntity(Edge(Directions.right, function (player) {

            if (complete) return;

            complete = true;

            var next = PyramidEdge(Monster, randomPosition);

            my.slideRoomLeft(next);

        }));

        return my;
    };

    return DesertRoom;

});