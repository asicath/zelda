var Item = function() {
    var my = Entity();

    my.entityType = 'item';
    my.getFootPrint().setSize(16, 16);
    my.icon = Icon(my, Sprites.items);

    var frameCount = 0;


    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        executeFrame_parent(room);

        frameCount++;

        // flickers for 30 frames
        my.flickering = frameCount <= 30;

        if (!my.flickering) {
            checkForPickup(room);
        }

        // Lasts for 508 frames
        if (frameCount >= 508) {
            room.removeEntity(my);
        }

    };

    var checkForPickup = function(room) {
        // check for player intersection
        var a = room.getIntersectingEntities(my, 'player');
        if (a) {
            for (var i = a.length-1; i >= 0; i--) {
                my.onPickUp(a[i]);
                room.removeEntity(my);
            }
        }

        // players swords can pickup items
        a = room.getIntersectingEntities(my, 'sword');
        if (a) {
            for (var i = a.length-1; i >= 0; i--) {
                my.onPickUp(a[i].player);
                room.removeEntity(my);
            }
        }
    };

    my.onPickUp = function(player) {};

    return my;
};
