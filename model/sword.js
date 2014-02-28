var Sword = function() {
    var my = Entity();

    my.sprites = Sprites.sword;
    my.palette = Palettes.MonsterBlue;

    // will get updated by player
    my.rect = new Rect(0, 0, 0, 0);

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        executeFrame_parent(room);

        // check for intersection
        var a = room.getIntersectingEntities(my);
        for (var i = a.length-1; i >= 0; i--) {
            if (a[i].entityType == 'monster') {
                a[i].takeDamage(4, my.rect, room);
            }
        }

    };




    return my;
};