var SpawnCloud = function(entity) {
    var my = Entity();

    my.rect = entity.rect;

    my.sprites = Sprites.cloud;
    my.spriteIndex = 0;
    my.palette = Palettes.DeathStarWhiteBlue;

    my.entityType = "spawn";

    var frame = 0;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

        if (frame == 32) {
            my.spriteIndex = 1;
        }

        if (frame == 38) {
            my.spriteIndex = 2;
        }

        if (frame == 44) {
            room.removeEntity(my);
            room.addEntity(entity);
        }

        frame++;
    };

    return my;
};