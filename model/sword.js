var Sword = function(playerId) {
    var my = Entity();

    my.sprites = Sprites.sword;
    my.palette = Palettes.MonsterBlue;
    my.entityType = "sword";
    my.playerId = playerId;

    // will get updated by player
    my.rect = new Rect(0, 0, 0, 0);

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        executeFrame_parent(room);

        // check for intersection
        var a = room.getIntersectingEntities(my);
        var e;
        for (var i = a.length-1; i >= 0; i--) {
            e = a[i];

            if (e.entityType == 'monster') {
                e.takeDamage(4, my, room);
                my.onHit(room);
            }

            if (e.entityType == 'player' && e.playerId != playerId) {
                e.takeDamage(4, my, room);
                my.onHit(room);
            }


        }

    };

    my.onHit = function(room) {

    };




    return my;
};