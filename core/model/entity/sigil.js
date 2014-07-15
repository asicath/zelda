var Sigil = function() {
    var my = Entity();

    my.icon = Icon(my, SpriteSheets.elements);

    my.getFootPrint().setSize(16, 16);

    my.entityType = "sigil";
    my.icon.startFlashing();

    return my;
};