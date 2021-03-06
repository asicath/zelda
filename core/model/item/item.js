define(['../entity/entity', '../icon', 'view/sprite_sheet'], function(Entity, Icon, SpriteSheet) {

    var spriteSheet = SpriteSheet({url:"core/assets/sprites/items.png"});

    return function () {
        var my = Entity();

        my.getFootPrint().setSize(16, 16);
        my.icon = Icon(my, spriteSheet);

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

        my.addFrameItem('find', checkForPickup);

        var allowedToPickup = function(e) {
            return e.canPickupItems;
        };

        function checkForPickup() {

            if (!pickupAllowed) return;

            // check for player intersection
            var a = my.room.getEntities([allowedToPickup, my.intersects]);
            if (a) {
                for (var i = a.length - 1; i >= 0; i--) {
                    if (a[i].isPlayer) my.onPickUp(a[i]);
                    else my.onPickUp(a[i].player);
                    my.room.removeEntity(my);
                }
            }
        }

        my.onPickUp = function (player) {
        };

        return my;
    };

});