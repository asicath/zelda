var SpawnCloud = function(entity) {
    var my = Entity();

    my.rect = entity.rect;

    my.icon.sprites = Sprites.cloud;
    my.icon.spriteIndex = 0;
    my.icon.palette = Palettes.DeathStarWhiteBlue;

    my.entityType = "spawn";

    var frame = 0;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

        if (frame == 32) {
            my.icon.spriteIndex = 1;
        }

        if (frame == 38) {
            my.icon.spriteIndex = 2;
        }

        if (frame == 44) {
            room.removeEntity(my);
            room.addEntity(entity);
        }

        frame++;
    };

    return my;
};