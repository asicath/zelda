define(function() {

    return function (entity) {
        var my = Entity();

        if (entity)
            my.position = entity.position;

        my.icon = Icon(my, SpriteSheets.cloud);

        my.entityType = "spawn";

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