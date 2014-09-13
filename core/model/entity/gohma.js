define(['../action/aimed_shooter'], function(AimedShooter) {

    return function () {
        var my = Entity();

        my.icon = Icon(my, SpriteSheets.gohma);

        Mortal(my);
        Mover(my);
        AimedShooter(my);

        ItemDropper(my);

        my.movementSources.push(new Shuffle(my));

        my.wallSensitive = false;
        my.entityType = 'monster';
        my.life = 20;

        my.stepChange = 8;

        my.getFootPrint().setSize(48, 16);


        var itemDropLevel = 0;

        my.speed = 0.25;
        my.changeDirectionPercent = 4 / 16;

        var eyeClosed = false;
        var eyeSwapFrames = 0;

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

            if (eyeSwapFrames > 0) {
                if (eyeClosed) {

                    if (--eyeSwapFrames > 0) {
                        my.icon.spriteIndex = 2;
                    }
                    else {
                        my.icon.spriteIndex = 4;
                    }

                }
                else {
                    if (--eyeSwapFrames > 0) {
                        my.icon.spriteIndex = 2;
                    }
                    else {
                        my.icon.spriteIndex = 0;
                    }

                }
            }
            else {
                if (Math.random() < 0.01) {
                    eyeSwapFrames = 30;
                    eyeClosed = !eyeClosed;
                }
            }


            if (soundWait > 0) {
                soundWait--;
            }
        };

        var soundWait = 0;
        var takeDamage_parent = my.takeDamage;
        my.takeDamage = function (amount, entity) {

            if (eyeClosed || eyeSwapFrames > 0) {
                if (soundWait == 0) {
                    Sounds.shield.play();
                    soundWait = 10;
                }

            }
            else {
                takeDamage_parent(amount, entity);
            }

        };

        my.afterDeath = function () {
            my.dropItem('c');
        };

        return my;
    };

});


