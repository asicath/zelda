var Aquamentus = function() {
    var my = Entity();

    Mortal(my);
    Mover(my);
    AimedShooter(my);

    ItemDropper(my);

    my.movementSources.push(new Shuffle(my));

    my.wallSensitive = false;
    my.entityType = 'monster';
    my.life = 20;

    my.stepChange = 8;

    my.getFootPrint().setSize(24, 32);

    my.icon.sprites = Sprites.aquamentus;
    my.icon.spriteIndex = 0;
    my.icon.palette = Palettes.Aquamentus;

    var itemDropLevel = 0;

    my.speed = 0.25;
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




