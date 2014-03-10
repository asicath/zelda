var Item = function() {
    var my = Entity();

    my.entityType = 'item';
    my.rect = new Rect(0, 0, 16, 16);
    my.sprites = Sprites.items;

    // set by child
    //my.palette = Palettes.MonsterRed;
    //my.spriteIndex = 2;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        executeFrame_parent(room);

        // check for player intersection
        var a = room.getIntersectingEntities(my);
        var e;
        for (var i = a.length-1; i >= 0; i--) {
            e = a[i];
            if (e.entityType == 'player') {
                my.onPickUp(e);
                room.removeAfterFrame.push(my);
            }
        }

    };

    my.onPickUp = function(player) {};

    return my;
};
