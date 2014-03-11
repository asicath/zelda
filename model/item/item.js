var Item = function() {
    var my = Entity();

    my.entityType = 'item';
    my.rect = new Rect(0, 0, 16, 16);
    my.sprites = Sprites.items;

    var frameCount = 0;

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
            else if (e.entityType == 'sword') {
                my.onPickUp(e.player);
                room.removeAfterFrame.push(my);
            }
        }

        frameCount++;

        // flickers invisible for 30 frames in 2 frame intervals
        my.visible = frameCount > 30 || frameCount % 2 == 0;

        // Lasts for 508 frames
        if (frameCount >= 508) {
            room.removeAfterFrame.push(my);
        }

    };

    my.onPickUp = function(player) {};

    return my;
};
