var Circle = function() {
    var my = Entity();

    my.icon.spriteSheet = Sprites.circle;
    my.icon.spriteIndex = 0;

    my.getFootPrint().setSize(32, 32);

    my.entityType = "circle";

    return my;
};