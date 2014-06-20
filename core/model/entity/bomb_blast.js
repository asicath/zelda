var BombBlast = function(player) {
    var my = Entity();

    my.entityType = "blast";
    my.icon = null;
    my.visible = false;
    my.getFootPrint().setSize(16, 16);

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        executeFrame_parent(room);

        // check for intersection with player
        var a = room.getIntersectingEntities(my, 'player', null);
        if (a) {
            for (var i = a.length-1; i >= 0; i--) {
                a[i].takeDamage(4, my, room);
            }
        }

        // check for intersection
        a = room.getIntersectingEntities(my, 'monster');
        if (a) {
            for (var i = a.length-1; i >= 0; i--) {
                a[i].takeDamage(8, player, room);
            }
        }

    };

    my.setFrameTimeout(10, function(room) {
        room.removeEntity(my);
    });

    return my;
};
