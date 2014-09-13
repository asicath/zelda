define(function() {

    return function (player) {
        var my = Entity();

        my.entityType = "blast";
        my.icon = null;
        my.visible = false;
        my.getFootPrint().setSize(16, 16);

        var executeFrame_parent = my.executeFrame;
        my.executeFrame = function () {
            executeFrame_parent();

            // check for intersection with player
            var a = my.room.getIntersectingEntities(my, 'player', null);
            if (a) {
                for (var i = a.length - 1; i >= 0; i--) {
                    a[i].takeDamage(4, my);
                }
            }

            // check for intersection
            a = my.room.getIntersectingEntities(my, 'monster');
            if (a) {
                for (var i = a.length - 1; i >= 0; i--) {
                    a[i].takeDamage(8, player);
                }
            }

        };

        my.setFrameTimeout(10, function () {
            my.room.removeEntity(my);
        });

        return my;
    };

});
