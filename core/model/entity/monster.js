var Monster = function(level) {
    var my = Entity();

    my.icon = Icon(my, SpriteSheets.octopus);
    my.icon.drawOffset.y = -2;

    Mortal(my);
    Mover(my);
    Shooter(my);

    ItemDropper(my);

    my.movementSources.push(new WalkRandom(my));
    my.movementSources.push(new Push(my));

    my.wallSensitive = true;
    my.entityType = 'monster';

    if (level == 1) {
        my.life = 4;
    }
    else if (level == 2) {
        my.life = 8;

        if (!Monster.Blue) {
            Monster.Blue = ImageOptions('blue').addColorSwap("06", "02").addColorSwap("27", "32");
        }

        my.icon.imageOptions = Monster.Blue;
    }


    my.stepChange = 8;

    my.getFootPrint().setSize(16, 16);



    my.facingSpriteBaseIndex = [0, 2, 4, 6];

    var itemDropLevel = 'a';

    if (Math.random() < 0.25) {
        // Fast
        my.speed = 1.0; // can move 40 pixels in 1s or 60 frames
        my.changeDirectionPercent = 6/16;
        my.homingPercent = 128/255;
        itemDropLevel = 'b';
    }
    else {
        // Slow
        my.speed = 0.5; // can move 40 pixels in 1s or 60 frames
        my.changeDirectionPercent = 4/16;
        my.homingPercent = 64/255;
    }

    my.onTakeDamage = function(entity) {
        my.pushFromThrust(entity.facing);
    };

    my.afterDeath = function(room) {
        my.dropItem(room, itemDropLevel);
    };

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

    return my;
};
