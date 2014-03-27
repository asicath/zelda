var Aquamentus = function() {
    var my = Entity();

    Mortal(my);
    Mover(my);
    //Shooter(my);

    ItemDropper(my);

    my.movementSources.push(new Shuffle(my));

    my.wallSensitive = false;
    my.entityType = 'monster';
    my.life = 12;

    my.stepChange = 8;

    my.getFootPrint().setSize(24, 32);

    my.icon.sprites = Sprites.aquamentus;
    my.icon.spriteIndex = 0;
    my.icon.palette = Palettes.LinkGreen;

    var itemDropLevel = 0;

    my.speed = 0.25; // can move 40 pixels in 1s or 60 frames
    my.changeDirectionPercent = 4/16;


    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

        executeFrame_parent(room);

        // check for intersection with player
        var a = room.getIntersectingEntities(my, 'player', 'monsterHit');
        if (a) {
            for (var i = a.length-1; i >= 0; i--) {
                a[i].takeDamage(2, my, room);
            }
        }

    };

    my.afterDeath = function(room) {
        my.dropItem(room, itemDropLevel);
    };

    return my;
};




