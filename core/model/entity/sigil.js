var Sigil = function() {
    var my = Entity();

    my.icon.spriteSheet = Icon(my, Sprites.element);

    my.getFootPrint().setSize(16, 16);

    my.entityType = "sigil";
    my.icon.flashing = true;

    return my;
};