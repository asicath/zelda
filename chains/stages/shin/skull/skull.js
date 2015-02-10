define([
    '../../../../core/model/entity/entity',
    'core/model/icon',
    'core/model/entity/player_hitter',
    'core/model/action/shooter',
    'core/model/entity/mortal',
    'core/model/item/item_dropper',
    'core/model/movement/push',
    'core/model/movement/walk_random',
    'core/model/movement/mover',
    'view/image_options',
    'controller/load_sprites',
    'view/draw'
], function(
    Entity,
    Icon,
    PlayerHitter,
    Shooter,
    Mortal,
    ItemDropper,
    Push,
    WalkRandom,
    Mover,
    ImageOptions,
    LoadSprites,
    DrawText
    ) {

    var spriteInfo = LoadSprites.addSpriteSheet({url:"chains/stages/shin/skull/skull.png", name:"skull"});

    return function () {
        var my = Entity();

        my.icon = Icon(my, spriteInfo.spriteSheet);
        my.icon.drawOffset.y = -2;

        my.isMonster = true;



        PlayerHitter(my);
        Mortal(my);
        Mover(my);

        my.movementSources.push(new Push(my));

        my.wallSensitive = true;
        my.life = 8;


        my.getFootPrint().setSize(16, 16);


        var takeDamage_parent = my.onTakeDamage;
        my.onTakeDamage = function (entity) {
            takeDamage_parent(entity);
            my.pushFromThrust(entity.facing);
        };

        my.onPlayerHit = function(player) {
            player.takeDamage(2, my);
        };


        my.isOff = true;

        var isTalking = false;
        var talkVisible, talkMessage, afterTalk, isScreaming;
        my.talk = function(message, after) {
            isTalking = true;
            talkFrame = 0;
            talkMessage = message;
            talkVisible = "";
            afterTalk = after;
        };

        my.scream = function(message, after) {
            isScreaming = true;
            my.talk(message, after);
        };


        var talkFrame = 0;

        my.addFrameItem('post', function() {

            if (talkFrame && ! isTalking) {
                talkFrame--;
                if (talkFrame == 0) {
                    talkVisible = null;
                    if (afterTalk) afterTalk();
                }
            }

            if (!isTalking) return;

            talkFrame++;

            if (isScreaming) {
                my.icon.spriteIndex = 2;
            }
            else {
                my.icon.spriteIndex = 1 + Math.floor(talkFrame / 6) % 2;
            }


            if (talkVisible.length < talkMessage.length && talkFrame % 10 == 0) {
                talkVisible = talkMessage.substr(0, talkVisible.length+1);

                if (talkVisible.length == talkMessage.length) {
                    isTalking = false;
                    my.icon.spriteIndex = 1;

                }
            }

        });

        var drawEntity_parent = my.drawEntity;
        my.drawEntity = function (ctx) {
            drawEntity_parent(ctx);
            if (talkVisible) {
                DrawText.drawText(ctx, talkVisible, my.position.x, my.position.y + 20);
            }

        };



        return my;
    };
});