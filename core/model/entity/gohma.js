define([
    './entity',
    '../icon',
    './player_hitter',
    '../action/aimed_shooter',
    './mortal',
    '../item/item_dropper',
    '../movement/shuffle',
    '../movement/mover',
    'controller/load_sprites'
], function(
    Entity,
    Icon,
    PlayerHitter,
    AimedShooter,
    Mortal,
    ItemDropper,
    Shuffle,
    Mover,
    LoadSprites
    ) {

    LoadSprites.addSpriteSheet({url:"core/assets/sprites/gohma.gif", name:"gohma", map:[
        {x:0,  y: 0, width: 48, height:16},
        {x:0,  y: 16, width: 48, height:16},
        {x:48,  y: 0, width: 48, height:16},
        {x:48,  y: 16, width: 48, height:16},
        {x:96,  y: 0, width: 48, height:16},
        {x:96,  y: 16, width: 48, height:16},
        {x:144,  y: 0, width: 48, height:16},
        {x:144,  y: 16, width: 48, height:16}
    ]});

    return function () {
        var my = Entity();

        my.icon = Icon(my, SpriteSheets.gohma);

        my.isMonster = true;

        PlayerHitter(my);
        Mortal(my);
        Mover(my);
        AimedShooter(my);

        ItemDropper(my);

        my.movementSources.push(new Shuffle(my));

        my.wallSensitive = false;
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

        my.onPlayerHit = function(player) {
            player.takeDamage(2, my);
        };

        return my;
    };

});


