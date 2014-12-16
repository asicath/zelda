define(['./entity', '../icon', 'controller/load_sprites'], function(Entity, Icon, LoadSprites) {

    LoadSprites.addSpriteSheet({url:"core/assets/sprites/cloud.png", name:"cloud"});

    return function (entity) {
        var my = Entity();

        if (entity)
            my.position = entity.position;

        my.icon = Icon(my, SpriteSheets.cloud);

        my.setFrameTimeout(32, function () {
            my.icon.spriteIndex = 1;
        });

        my.setFrameTimeout(38, function () {
            my.icon.spriteIndex = 2;
        });

        my.setFrameTimeout(44, function () {
            my.room.removeEntity(my);
            if (entity)
                my.room.addEntity(entity);
        });


        return my;
    };

});