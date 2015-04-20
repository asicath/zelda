define([
    'chains/stages/shin/desert_room',
    'view/sprite_sheet',
    'core/model/entity/edge'
], function(
    ShinRoom,
    SpriteSheet,
    Edge
) {

    var image = SpriteSheet({url:'chains/stages/shin/images/shin_level_backs/shin4.png', map:[{x: 0, y: 0, width: 256, height: 176}]});
    var overlay = SpriteSheet({url:'chains/stages/shin/images/shin_level_backs/shin4_overlay.png', map:[{x: 0, y: 0, width: 256, height: 176}]});

    return function (Monster, randomPosition) {

        var my = ShinRoom(Monster, randomPosition, image, overlay);

        my.title = "pyramid ascent";


        /*
        var complete = false;
        my.addEntity(Edge(Directions.right, function (player) {

            if (complete) return;

            complete = true;

            var next = DesertRoom(Monster, randomPosition);

            my.slideRoomLeft(next);

        }));
        */

        return my;
    };

});