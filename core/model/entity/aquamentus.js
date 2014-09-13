define(['../action/aimed_shooter'], function(AimedShooter) {

    return function () {

        var my = Entity();

        my.icon = Icon(my, SpriteSheets.aquamentus);

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

        my.fireballAngles = [0.9, 1, 1.1];
        my.shuffleDirection = [null, Directions.left, Directions.left, Directions.right, Directions.right];


        var itemDropLevel = 0;

        my.speed = 0.25;
        my.changeDirectionPercent = 4 / 16;


        var executeFrame_parent = my.executeFrame;
        my.executeFrame = function () {

            executeFrame_parent();

            // check for intersection with player
            var a = my.room.getIntersectingEntities(my, 'player', 'monsterHit');
            if (a) {
                for (var i = a.length - 1; i >= 0; i--) {
                    a[i].takeDamage(2, my);
                }
            }

        };

        my.afterDeath = function () {
            my.dropItem('c');
        };

        return my;
    };

});



