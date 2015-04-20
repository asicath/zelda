define([
    'chains/stages/shin/shin_room',
    'view/sprite_sheet',
    'core/model/entity/edge',
    'chains/stages/shin/rooms/pyramid_wall'
], function(
    ShinRoom,
    SpriteSheet,
    Edge,
    PyramidWall
) {

    var image = SpriteSheet({url:'chains/stages/shin/images/shin_level_backs/shin2.png', map:[{x: 0, y: 0, width: 256, height: 176}]});
    var overlay = SpriteSheet({url:'chains/stages/shin/images/shin_level_backs/shin2_overlay.png', map:[{x: 0, y: 0, width: 256, height: 176}]});

    return function (Monster, randomPosition) {

        var my = ShinRoom(Monster, randomPosition, image, overlay);

        my.title = "pyramid edge";



        var complete = false;
        my.addEntity(Edge(Directions.right, function (player) {

            if (complete) return;

            complete = true;

            var next = PyramidWall(Monster, randomPosition);

            my.slideRoomLeft(next);

        }));


        return my;
    };

});