var Explosion = function(angle) {
    var my = Entity();
    my = Mover(my);

    my.movementSources.push(new Missile(my));

    my.flashing = true;

    my.shoot(angle, 30/22);

    my.sprites = Sprites.explosion;
    my.spriteIndex = 0;

    my.palette = Palettes.MonsterBlue;
    my.entityType = "explosion";

    my.rect = new Rect(0, 0, 0, 0);

    var frame = 0;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        executeFrame_parent(room);

        if (frame++ == 22) {
            room.removeAfterFrame.push(my);
        }

    };

    my.flashPalates = [
        Palettes.DeathStarRedBlue, // should be all blue
        Palettes.DeathStarWhiteGold,
        Palettes.DeathStarWhiteBlue,
        Palettes.DeathStarRedGold
    ];

    my.onEdgeEvent = function(room, wall, rect) {
        return true;
    };


    return my;
};