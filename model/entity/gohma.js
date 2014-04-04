var Gohma = function() {
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

    my.getFootPrint().setSize(48, 16);

    my.icon.sprites = Sprites.gohma;
    my.icon.spriteIndex = 0;
    my.icon.palette = Palettes.MonsterRed;

    var itemDropLevel = 0;

    my.speed = 0.25;
    my.changeDirectionPercent = 4/16;

    var eyeClosed = false;
    var eyeSwapFrames = 0;

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


        if (soundWait > 0) {soundWait--;}
    };

    var soundWait = 0;
    var takeDamage_parent = my.takeDamage;
    my.takeDamage = function(amount, entity, room) {

        if (eyeClosed || eyeSwapFrames > 0) {
            if (soundWait == 0) {
                sound_shield.play();
                soundWait = 10;
            }

        }
        else {
            takeDamage_parent(amount, entity, room);
        }

    };

    my.afterDeath = function(room) {
        my.dropItem(room, itemDropLevel);
    };

    return my;
};




