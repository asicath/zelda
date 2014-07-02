var Circle = function() {
    var my = Entity();

    my.icon = Icon(my, SpriteSheets.circle);

    my.getFootPrint().setSize(32, 32);

    my.entityType = "circle";

    return my;
};