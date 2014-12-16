define(['./entity', '../icon', 'controller/load_sprites'], function(Entity, Icon, LoadSprites) {

    LoadSprites.addSpriteSheet({url:"core/assets/sprites/circle.png", name:"circle"});

    return function () {
        var my = Entity();

        my.icon = Icon(my, SpriteSheets.circle);

        my.getFootPrint().setSize(32, 32);

        return my;
    };

});