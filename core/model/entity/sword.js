var Sword = function(player) {
    var my = Entity();

    my.icon.sprites = Sprites.sword;

    my.entityType = "sword";
    my.playerId = player.playerId; // expose for kill counting in monster
    my.player = player;             // expose so items can be picked up by swords

    var frame = 0;
    my.maxFrame = 12;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        executeFrame_parent(room);

        frame++;

        if (frame > my.maxFrame) {
            // Make sure the sword doesn't stick around after death
            // should do this differently
            room.removeEntity(my);
        }

        // check for intersection
        var a = room.getIntersectingEntities(my, 'monster');
        if (a) {
            for (var i = a.length-1; i >= 0; i--) {
                a[i].takeDamage(4, my, room);
                my.onHit(room);
            }
        }

        //if (e.entityType == 'player' && e.playerId != my.player.playerId) {
        //e.takeDamage(4, my, room);
        //my.onHit(room);
        //}

    };

    my.onHit = function(room) {

    };




    return my;
};