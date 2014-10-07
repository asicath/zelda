define([
    'core/model/entity/entity',
    'core/model/icon',
    'core/model/action/shooter',
    'core/model/entity/mortal',
    'core/model/item/item_dropper',
    'view/image_options',
    'controller/load_sprites',
    'chains/monsters/eyeball/fireball'
], function(
    Entity,
    Icon,
    Shooter,
    Mortal,
    ItemDropper,
    ImageOptions,
    LoadSprites,
    Fireball
    ) {

    LoadSprites.addSpriteSheet({url:"chains/monsters/eyeball/eye_black.png", name:"eyeball", map:[
        {x:   0, y: 0, width: 56, height:33},
        {x:  56, y: 0, width: 56, height:33},
        {x: 112, y: 0, width: 56, height:33},
        {x: 168, y: 0, width: 56, height:33},
        {x: 224, y: 0, width: 56, height:33},

        {x:   0, y: 33, width: 56, height:33},
        {x:  56, y: 33, width: 56, height:33},
        {x: 112, y: 33, width: 56, height:33},
        {x: 168, y: 33, width: 56, height:33},
        {x: 224, y: 33, width: 56, height:33},

        {x:   0, y: 66, width: 56, height:33},
        {x:  56, y: 66, width: 56, height:33},
        {x: 112, y: 66, width: 56, height:33},
        {x: 168, y: 66, width: 56, height:33},
        {x: 224, y: 66, width: 56, height:33}
    ]});

    return function (angleBase) {
        var my = Entity();

        Mortal(my);

        my.icon = Icon(my, SpriteSheets.eyeball, 10);

        my.entityType = 'monster';
        my.life = 100;
        my.getFootPrint().setSize(56, 33);

        var moveFrame = 0;
        var maxMoveFrame = 60 * 2;
        var moveRadius = 72;

        //var angleBase = 0;
        if (!angleBase) angleBase = 0;

        var isRotating = false;

        var appearingFrame = 0;
        var openingFrame = 0;

        var processAppearingFrame = function() {
            my.icon.spriteIndex = 10 + appearingFrame;
            my.setFrameTimeout(30, function () {
                if (++appearingFrame < 5) {
                    processAppearingFrame();
                }
                else {
                    processOpeningFrame();
                }
            });
        };

        var processOpeningFrame = function() {
            my.icon.spriteIndex = 9 - openingFrame;
            my.setFrameTimeout(30, function () {
                if (++openingFrame < 5) {
                    processOpeningFrame();
                }
                else {
                    my.setFrameTimeout(60, function () {
                        isRotating = true;
                    });
                }
            });
        };


        my.setFrameTimeout(60, function () {
            processAppearingFrame();
        });




        my.onAddToRoom = function() {
            my.center = {
                x: Math.floor(my.room.rect.width / 2),
                y: Math.floor(my.room.rect.height / 2)
            };

            angleBase = Math.PI * 12/8;

            setAngle(0);
        };

        var setAngle = function(offset) {
            var angle = (angleBase + offset) % (Math.PI * 2);
            var sprite = my.icon.getSprite();
            my.position.x = Math.cos(angle) * moveRadius * 1.4 + my.center.x - Math.floor(sprite.width / 2);
            my.position.y = Math.sin(angle) * moveRadius + my.center.y - Math.floor(sprite.height / 2);
        };

        var lastStop = 0;
        var tillNextStop = 3;

        var executeFrame_parent = my.executeFrame;
        my.executeFrame = function () {

            executeFrame_parent();

            if (isRotating) {
                var percent = ((moveFrame++ % maxMoveFrame) / maxMoveFrame);

                setAngle(percent * Math.PI * 2);

                // check for event at every quarter
                if (Math.floor(percent / 0.25) != lastStop) {
                    lastStop = Math.floor(percent / 0.25);
                    onQuarter();
                }
            }

            // check for intersection with player
            var a = my.room.getIntersectingEntities(my, 'player', 'monsterHit');
            if (a) {
                for (var i = a.length - 1; i >= 0; i--) {
                    a[i].takeDamage(2, my);
                }
            }

        };

        // called each time the eye hits a quarter
        var onQuarter = function() {

            tillNextStop--;

            if (tillNextStop == 0) {

                // stop
                isRotating = false;


                // look at center
                my.setFrameTimeout(30, function () {
                    switch (lastStop) {
                        case 0:
                            my.icon.spriteIndex = 1;
                            break;
                        case 1:
                            my.icon.spriteIndex = 2;
                            break;
                        case 2:
                            my.icon.spriteIndex = 3;
                            break;
                        case 3:
                            my.icon.spriteIndex = 4;
                            break;
                    }
                });

                //var fireball = Fireball(my);
                my.setFrameTimeout(60, function () {
                    //my.room.addEntity(fireball);
                });

                // look back
                my.setFrameTimeout(90, function () {
                    my.icon.spriteIndex = 0;
                    //fireball.launch();
                });

                // start moving again
                my.setFrameTimeout(120, function () {
                    isRotating = true;

                    tillNextStop = Math.floor(Math.random() * 4 + 2);
                });
            }

        };


        return my;
    };
});
