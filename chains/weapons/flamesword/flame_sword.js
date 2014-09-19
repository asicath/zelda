var FlameSword = function(player) {
    var my = Entity();

    my.icon = Icon(my, SpriteSheets.flamingsword);

    my.entityType = "sword";
    my.playerId = player.playerId; // expose for kill counting in monster
    my.player = player;             // expose so items can be picked up by swords

    var frame = 0;

    var alt = 0;

    my.icon.getSprite = function() {
        return my.icon.spriteSheet.sprites[my.icon.spriteIndex + alt];
    };

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function() {
        executeFrame_parent();

        frame++;

        alt = Math.floor(frame / 6) % 2;

        // check for intersection
        var a = my.room.getIntersectingEntities(my, 'monster');
        if (a) {
            for (var i = a.length-1; i >= 0; i--) {
                a[i].takeDamage(4, my);
                my.onHit();
            }
        }

    };

    my.onHit = function() {

    };

    return my;
};