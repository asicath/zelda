define(['../entity/entity', '../icon', 'view/draw', 'core/model/directives'], function(Entity, Icon, DrawText, Directives) {

    return function (cost, actionType, arg0) {
        var my = Entity();

        my.getFootPrint().setSize(16, 16);

        my.icon = Icon(my, SpriteSheets.weaponIcons);
        my.icon.spriteIndex = actionType().weaponIconIndex;

        var costDisplay = cost.toString();


        my.drawEntity = function (ctx) {
            my.icon.drawIcon(ctx);
            DrawText.drawText(ctx, costDisplay, my.position.x - 1 - 8 * (costDisplay.length - 2), my.position.y + 8 * 3);
        };

        var executeFrame_parent = my.executeFrame;
        my.executeFrame = function () {
            executeFrame_parent();

            checkForPickup();
        };

        var getPlayers = function(e) {
            return e.isPlayer;
        };

        var checkForPickup = function () {
            // check for player intersection
            var a = my.room.getEntities([getPlayers, my.intersects]);
            if (a) {
                for (var i = a.length - 1; i >= 0; i--) {

                    var player = a[i];

                    if (player.rupees >= cost) {
                        my.onPickUp(player);
                        my.room.removeEntity(my);
                        player.rupees -= cost;

                        Directives.nextMessage(4);
                        Directives.nextMessage(6);
                    }

                }
            }
        };

        my.onPickUp = function (player) {
            player.addAltAction(actionType(player, arg0));
            //Sounds.getRupee.play();
        };

        return my;
    };

});