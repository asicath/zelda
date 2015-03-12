define(['./entity', '../icon', 'view/sprite_sheet'], function(Entity, Icon, SpriteSheet) {

    var spriteSheet = SpriteSheet({url:"core/assets/sprites/cloud.png", name:"cloud"});

    return function (entity) {
        var my = Entity();

        if (entity)
            my.position = entity.position;

        my.icon = Icon(my, spriteSheet);

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