define(['../entity/entity'], function(Entity) {

    return function () {
        var my = Entity();

        my.entityType = 'item';
        my.getFootPrint().setSize(16, 16);
        my.icon = Icon(my, SpriteSheets.items);

        var pickupAllowed = false;

        // Flicker for 30 frames
        // Dont allow pickup during flicker
        my.icon.startFlickering();
        my.setFrameTimeout(30, function () {
            my.icon.stopFlickering();
            pickupAllowed = true;
        });

        // Lasts for 508 frames
        my.setFrameTimeout(508, function () {
            my.room.removeEntity(my);
        });


        var executeFrame_parent = my.executeFrame;
        my.executeFrame = function () {
            executeFrame_parent();

            if (pickupAllowed)
                checkForPickup();

        };

        var checkForPickup = function () {
            // check for player intersection
            var a = my.room.getIntersectingEntities(my, 'player');
            if (a) {
                for (var i = a.length - 1; i >= 0; i--) {
                    my.onPickUp(a[i]);
                    my.room.removeEntity(my);
                }
            }

            // players swords can pickup items
            a = my.room.getIntersectingEntities(my, 'sword');
            if (a) {
                for (var i = a.length - 1; i >= 0; i--) {
                    my.onPickUp(a[i].player);
                    my.room.removeEntity(my);
                }
            }
        };

        my.onPickUp = function (player) {
        };

        return my;
    };

});