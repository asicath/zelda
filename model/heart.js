var Heart = function() {
    var my = Entity();

    my.entityType = 'item';
    my.rect = new Rect(0, 0, 8, 8);
    my.sprites = Sprites.items;
    my.spriteIndex = 2;
    my.palette = Palettes.MonsterRed;


    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        executeFrame_parent(room);

        // check for intersection
        var a = room.getIntersectingEntities(my);
        var e;
        for (var i = a.length-1; i >= 0; i--) {
            e = a[i];

            if (e.entityType == 'player') {
                var amount = 4;
                if (e.maxLife - e.life < amount) {
                    amount = e.maxLife - e.life;
                }

                e.life += amount;

                room.removeAfterFrame.push(my);
            }
        }

    };

    return my;
};
