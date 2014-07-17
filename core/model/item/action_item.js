var ActionItem = function(actionType, arg0) {
    var my = Item();

    my.icon = Icon(my, SpriteSheets.weaponIcons);
    my.icon.spriteIndex = actionType().weaponIconIndex;

    my.onPickUp = function(player) {
        player.addAltAction(actionType(player, arg0));
        //Sounds.getRupee.play();
    };

    return my;
};
