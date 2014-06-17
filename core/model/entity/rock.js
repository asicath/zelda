var Rock = function() {
    var my = Entity();
    Mover(my);

    my.movementSources.push(new Missile(my));

    my.wallSensitive = true;
    my.entityType = "rock";

    my.getFootPrint().setSize(16, 16);

    my.icon.sprites = Sprites.rock;
    my.icon.palette = Palettes.LinkGreen;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        executeFrame_parent(room);

        // check for intersection
        var a = room.getIntersectingEntities(my, 'player', 'monsterHit');
        if (a) {
            var e;
            for (var i = a.length-1; i >= 0; i--) {
                e = a[i];

                var blocked = false;
                switch(my.facing) {
                    case Directions.right: blocked = e.facing == Directions.left; break;
                    case Directions.top: blocked = e.facing == Directions.bottom; break;
                    case Directions.left: blocked = e.facing == Directions.right; break;
                    case Directions.bottom: blocked = e.facing == Directions.top; break;
                }

                if (blocked && e.shieldUp) {
                    room.removeEntity(my);
                    Sounds.shield.play();
                }
                else {
                    e.takeDamage(2, my, room);
                    room.removeEntity(my);
                }

            }
        }

    };

    my.onEdgeEvent = function(room, wall, rect) {
        room.removeEntity(my);
    };

    my.onWallEvent = function(room, wall, rect) {
        room.removeEntity(my);
    };

    return my;
};