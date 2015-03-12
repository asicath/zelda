define(['core/model/entity/entity', 'core/model/icon', 'view/sprite_sheet'], function(Entity, Icon, SpriteSheet) {

    var spriteSheet = SpriteSheet({url:"chains/weapons/flamesword/flame.png"});

    return function () {
        var my = Entity();

        my.icon = Icon(my, spriteSheet);

        var setupSwap = function() {
            my.setFrameTimeout(4, function () {
                my.icon.spriteIndex = my.icon.spriteIndex ? 0 : 1;
                setupSwap();
            });
        };

        setupSwap();

        my.setFrameTimeout(44, function () {
            my.room.removeEntity(my);
        });


        return my;
    };

});