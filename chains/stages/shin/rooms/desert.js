define([
    'chains/stages/shin/desert_room',
    'view/sprite_sheet'
], function(
    ShinRoom,
    SpriteSheet
) {

    var image = SpriteSheet({url:'chains/stages/shin/images/desert.png', map:[{x: 0, y: 0, width: 256, height: 176}]});
    var overlay = SpriteSheet({url:'chains/stages/shin/images/desert_map.png', map:[{x: 0, y: 0, width: 256, height: 176}]});

    return function (Monster, randomPosition) {

        var my = ShinRoom(Monster, randomPosition, image, overlay);

        my.title = "desert";

        return my;
    };

});