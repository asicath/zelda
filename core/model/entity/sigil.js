define(['./entity', '../icon', 'view/sprite_sheet'], function(Entity, Icon, SpriteSheet) {

    var spriteSheet = SpriteSheet({url:"core/assets/sprites/element.png", name:"elements"});

    return function () {
        var my = Entity();

        my.icon = Icon(my, spriteSheet);

        my.getFootPrint().setSize(16, 16);

        my.icon.startFlashing();

        return my;
    };

});