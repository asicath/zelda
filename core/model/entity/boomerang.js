var Boomerang = function(player, direction) {
    var my = Entity();

    my.icon = Icon(my, SpriteSheets.boomerang);

    my.entityType = "boomerang";
    my.playerId = player.playerId; // expose for kill counting in monster
    my.player = player;             // expose so items can be picked up by swords

    return my;
};
