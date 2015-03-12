define(['./entity', '../icon', 'view/sprite_sheet'], function(Entity, Icon, SpriteSheet) {

    var spriteSheet = SpriteSheet({url:"core/assets/sprites/circle.png"});

    return function () {
        var my = Entity();

        my.icon = Icon(my, spriteSheet);

        my.getFootPrint().setSize(32, 32);

        return my;
    };

});