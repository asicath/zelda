define(['core/model/entity/entity', 'core/model/icon', 'controller/load_sprites'], function(Entity, Icon, LoadSprites) {

    var spriteInfo = LoadSprites.addSpriteSheet({url:"chains/weapons/flamesword/flame.png", name:"flame"});

    return function () {
        var my = Entity();

        my.icon = Icon(my, spriteInfo.spriteSheet);

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