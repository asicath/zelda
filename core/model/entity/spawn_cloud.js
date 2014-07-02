var SpawnCloud = function(entity) {
    var my = Entity();

    if (entity)
        my.position = entity.position;

    my.icon.spriteSheet = Sprites.cloud;
    my.icon.spriteIndex = 0;

    my.entityType = "spawn";

    my.setFrameTimeout(32, function() {
        my.icon.spriteIndex = 1;
    });

    my.setFrameTimeout(38, function() {
        my.icon.spriteIndex = 2;
    });

    my.setFrameTimeout(44, function(room) {
        room.removeEntity(my);
        if (entity)
            room.addEntity(entity);
    });


    return my;
};