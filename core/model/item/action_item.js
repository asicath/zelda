var ActionItem = function(cost, actionType, arg0) {
    var my = Entity();

    my.entityType = 'actionItem';
    my.getFootPrint().setSize(16, 16);

    my.icon = Icon(my, SpriteSheets.weaponIcons);
    my.icon.spriteIndex = actionType().weaponIconIndex;

    var costDisplay = cost.toString();


    my.drawEntity = function(ctx) {
        my.icon.drawIcon(ctx);
        View.drawText(ctx, costDisplay, my.position.x - 1 - 8*(costDisplay.length - 2), my.position.y + 8*3);
    };

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        executeFrame_parent(room);

        checkForPickup(room);
    };

    var checkForPickup = function(room) {
        // check for player intersection
        var a = room.getIntersectingEntities(my, 'player');
        if (a) {
            for (var i = a.length-1; i >= 0; i--) {

                var player = a[i];

                if (player.rupees >= cost) {
                    my.onPickUp(player);
                    room.removeEntity(my);
                    player.rupees -= cost;

                    if (Directives) Directives.nextMessage(4);
                    if (Directives) Directives.nextMessage(6);
                }

            }
        }
    };

    my.onPickUp = function(player) {
        player.addAltAction(actionType(player, arg0));
        //Sounds.getRupee.play();
    };

    return my;
};