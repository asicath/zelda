var Sword = function(player) {
    var my = Entity();

    my.icon = Icon(my, SpriteSheets.sword);

    my.entityType = "sword";
    my.playerId = player.playerId; // expose for kill counting in monster
    my.player = player;             // expose so items can be picked up by swords

    var frame = 0;
    my.maxFrame = 12;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function() {
        executeFrame_parent();

        frame++;

        if (frame > my.maxFrame) {
            // Make sure the sword doesn't stick around after death
            // should do this differently
            my.room.removeEntity(my);
        }

        // check for intersection
        var a = my.room.getIntersectingEntities(my, 'monster');
        if (a) {
            for (var i = a.length-1; i >= 0; i--) {
                a[i].takeDamage(4, my);
                my.onHit();
            }
        }

        //if (e.entityType == 'player' && e.playerId != my.player.playerId) {
        //e.takeDamage(4, my);
        //my.onHit();
        //}

    };

    my.onHit = function() {

    };




    return my;
};