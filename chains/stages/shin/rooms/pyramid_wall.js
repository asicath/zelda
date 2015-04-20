define([
    'chains/stages/shin/shin_room',
    'view/sprite_sheet',
    'core/model/entity/edge',
    'chains/stages/shin/rooms/pyramid_middle'
], function(
    ShinRoom,
    SpriteSheet,
    Edge,
    PyramidMiddle
) {

    var image = SpriteSheet({url:'chains/stages/shin/images/shin_level_backs/shin2.5.png', map:[{x: 0, y: 0, width: 256, height: 176}]});
    var overlay = SpriteSheet({url:'chains/stages/shin/images/shin_level_backs/shin2.5_overlay.png', map:[{x: 0, y: 0, width: 256, height: 176}]});

    return function (Monster, randomPosition) {

        var my = ShinRoom(Monster, randomPosition, image, overlay);

        my.title = "pyramid wall";



        var complete = false;
        my.addEntity(Edge(Directions.right, function (player) {

            if (complete) return;

            complete = true;

            var next = PyramidMiddle(Monster, randomPosition);

            my.slideRoomLeft(next);

        }));


        return my;
    };

});