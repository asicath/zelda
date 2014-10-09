define(['./entity', '../icon', 'controller/load_sprites'], function(Entity, Icon, LoadSprites) {

    LoadSprites.addSpriteSheet({url:"core/assets/sprites/element.gif", name:"elements"});

    return function () {
        var my = Entity();

        my.icon = Icon(my, SpriteSheets.elements);

        my.getFootPrint().setSize(16, 16);

        my.icon.startFlashing();

        return my;
    };

});