var Item = function() {
    var my = Entity();

    my.entityType = 'item';
    my.rect = new Rect(0, 0, 16, 16);
    my.icon.sprites = Sprites.items;

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
        var a = room.getIntersectingEntities(my);
        var e;
        for (var i = a.length-1; i >= 0; i--) {
            e = a[i];
            if (e.entityType == 'player') {
                my.onPickUp(e);
                room.removeEntity(my);
            }
            else if (e.entityType == 'sword') {
                my.onPickUp(e.player);
                room.removeEntity(my);
            }
        }
    };

    my.onPickUp = function(player) {};

    return my;
};
