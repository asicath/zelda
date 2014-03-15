var Fly = function() {
    var my = Entity();
    my = Mover(my);

    my.movementSources.push(new WalkRandom(my));

    my.wallSensitive = true;

    my.entityType = 'fly';

    my.life = 4;
    my.invincible = 0;
    my.stepChange = 8;

    my.rect = new Rect(128, 88, 3, 3);

    my.sprites = Sprites.fly;
    my.facingSpriteBaseIndex = [0, 0, 0, 0];
    my.spriteIndex = 0;
    my.palette = Palettes.Nihil;

    my.drawOffset.y = 0;

    var itemDropLevel = 0;


    // Fast
    my.speed = 1.0; // can move 40 pixels in 1s or 60 frames
    my.changeDirectionPercent = 6/16;
    my.homingPercent = 128/255;

    my.guideSize = 1;


    return my;
};