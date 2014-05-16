var Edge = function(direction) {
    var my = Entity();

    my.wallSensitive = true;
    my.entityType = "edge";
    my.icon = null;

    switch(direction) {
        case Directions.top:
            my.getFootPrint().setSize(256, 2);
            my.position.x = 0;
            my.position.y = 0;
            break;
        case Directions.bottom:
            my.getFootPrint().setSize(256, 2);
            my.position.x = 0;
            my.position.y = 174;
            break;
        case Directions.left:
            my.getFootPrint().setSize(2, 176);
            my.position.x = 0;
            my.position.y = 0;
            break;
        case Directions.right:
            my.getFootPrint().setSize(2, 176);
            my.position.x = 254;
            my.position.y = 0;
            break;
    }

    //my.icon.sprites = Sprites.rock;
    //my.icon.palette = Palettes.LinkGreen;
    my.visible = false;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        executeFrame_parent(room);

        // check for intersection
        var a = room.getIntersectingEntities(my, 'player', null);
        if (a) {
            var e;
            for (var i = a.length-1; i >= 0; i--) {
                e = a[i];

                if (!room.transition) {
                    room.transition = direction;

                    // Also bring over the player


                }


            }
        }

    };



    return my;
};