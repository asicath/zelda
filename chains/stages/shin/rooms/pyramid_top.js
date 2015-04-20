define([
    'chains/stages/shin/shin_room',
    'view/sprite_sheet',
    'core/model/entity/edge',
    'chains/stages/shin/eyeball/eyeball'
], function(
    ShinRoom,
    SpriteSheet,
    Edge,
    Eyeball
) {

    var image = SpriteSheet({url:'chains/stages/shin/images/shin_level_backs/shinboss1.png', map:[{x: 0, y: 0, width: 256, height: 176}]});
    var overlay = SpriteSheet({url:'chains/stages/shin/images/shin_level_backs/shinboss1_overlay.png', map:[{x: 0, y: 0, width: 256, height: 176}]});

    return function (Monster, randomPosition) {

        var my = ShinRoom(Eyeball, false, image, overlay);

        my.title = "pyramid top";


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