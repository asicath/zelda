var Fly = function() {
    var my = Entity();

    my.icon = Icon(my, Sprites.fly);
    my.icon.drawOffset.y = 0;

    Mover(my);

    my.movementSources.push(new WalkRandom(my));

    my.wallSensitive = true;
    my.entityType = 'fly';
    my.life = 4;
    my.invincible = 0;
    my.stepChange = 8;
    my.getFootPrint().setSize(3, 3);

    // Fast
    my.speed = 1.0; // can move 40 pixels in 1s or 60 frames
    my.changeDirectionPercent = 6/16;
    my.homingPercent = 128/255;
    my.guideSize = 1;


    my.facingSpriteBaseIndex = [0, 0, 0, 0];

    return my;
};