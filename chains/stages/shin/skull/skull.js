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
    'view/sprite_sheet',
    'view/draw',
    'core/controller/sound'
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
    SpriteSheet,
    DrawText,
    Sound
    ) {

    var spriteSheet = SpriteSheet({url:"chains/stages/shin/skull/skull.png"});
    var teethShound = Sound('chains/stages/shin/skull/skullteeth.wav');

    return function () {
        var my = Entity();

        my.icon = Icon(my, spriteSheet);
        my.icon.drawOffset.y = -2;

        my.isMonster = true;


        var looking = 0;
        var mouthOpen = 0;

        my.icon.getSpriteIndex = function() {
            return looking + mouthOpen;
        };

        my.look = function(direction) {
            switch(direction) {
                case "foreward": looking = 2; break;
                case "left": looking = 4; break;
                case "right": looking = 6; break;
                default: looking = 0;
            }
        };


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
                mouthOpen = 1;
            }
            else {
                mouthOpen = Math.floor(talkFrame / 6) % 2;
            }

            if (talkVisible.length < talkMessage.length && talkFrame % 7 == 0) {
                talkVisible = talkMessage.substr(0, talkVisible.length+1);

                teethShound.play();

                if (talkVisible.length == talkMessage.length) {
                    isTalking = false;
                    mouthOpen = 0;
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



        // HOPPING
        var isHopping = false;
        var startHopPosition = null;
        var hopDistance = 0;
        var hopFrames = 0;
        var hopFrame = 0;
        var hopHeight = 0;

        my.addFrameItem('post', function() {
            if (!isHopping) return;

            if (hopFrame == hopFrames) {
                my.position.x = startHopPosition.x + hopDistance;
                my.position.y = startHopPosition.y;
                isHopping = false;
            }
            else {

                var percent = hopFrame / hopFrames;

                var xChange = hopDistance * percent;
                my.position.x = startHopPosition.x + xChange;

                var yChange = hopHeight * Math.sin(Math.PI + Math.PI * percent);
                my.position.y = startHopPosition.y + yChange;

                hopFrame++;
            }

        });

        my.hopLeft = function() {
            isHopping = true;
            startHopPosition = my.position.clone();
            hopDistance = -16;
            hopFrames = 15;
            hopFrame = 0;
            hopHeight = 4;
        };

        my.hopRight = function() {
            isHopping = true;
            startHopPosition = my.position.clone();
            hopDistance = 16;
            hopFrames = 15;
            hopFrame = 0;
            hopHeight = 4;
        };



        return my;
    };
});