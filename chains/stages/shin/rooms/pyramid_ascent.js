define([
    'chains/stages/shin/shin_room',
    'view/sprite_sheet',
    'core/model/entity/edge',
    'chains/stages/shin/rooms/pyramid_top'
], function(
    ShinRoom,
    SpriteSheet,
    Edge,
    PyramidTop
) {

    var image = SpriteSheet({url:'chains/stages/shin/images/shin_level_backs/shin4.png', map:[{x: 0, y: 0, width: 256, height: 176}]});
    var overlay = SpriteSheet({url:'chains/stages/shin/images/shin_level_backs/shin4_overlay.png', map:[{x: 0, y: 0, width: 256, height: 176}]});

    return function (Monster, randomPosition) {

        var my = ShinRoom(Monster, randomPosition, image, overlay);

        my.title = "pyramid ascent";

        var complete = false;
        my.addEntity(Edge(Directions.top, function (player) {

            if (complete) return;

            complete = true;

            var next = PyramidTop(Monster, randomPosition);

            my.slideRoomDown(next);

        }));


        return my;
    };

});