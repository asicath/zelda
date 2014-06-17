var Circle = function() {
    var my = Entity();

    my.icon.sprites = Sprites.circle;
    my.icon.spriteIndex = 0;
    my.icon.palette = Palettes.MonsterRed;

    my.getFootPrint().setSize(32, 32);

    my.entityType = "circle";

    return my;
};