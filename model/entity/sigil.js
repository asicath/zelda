var Sigil = function() {
    var my = Entity();

    my.icon.sprites = Sprites.element;
    my.icon.spriteIndex = 0;
    my.icon.palette = Palettes.MonsterRed;

    my.getFootPrint().setSize(16, 16);

    my.entityType = "sigil";
    my.icon.flashing = true;

    return my;
};