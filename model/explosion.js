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

Explosion.create = function(room, x, y) {
    var ex1 = Explosion(Math.PI * 0.25);
    ex1.rect.x = x + 4;
    ex1.rect.y = y + 4;
    ex1.spriteIndex = 3;
    room.entities.push(ex1);

    var ex2 = Explosion(Math.PI * 0.75);
    ex2.rect.x = x;
    ex2.rect.y = y + 4;
    ex2.spriteIndex = 2;
    room.entities.push(ex2);

    var ex3 = Explosion(Math.PI * 1.25);
    ex3.rect.x = x;
    ex3.rect.y = y;
    ex3.spriteIndex = 0;
    room.entities.push(ex3);

    var ex4 = Explosion(Math.PI * 1.75);
    ex4.rect.x = x + 4;
    ex4.rect.y = y;
    ex4.spriteIndex = 1;
    room.entities.push(ex4);
};