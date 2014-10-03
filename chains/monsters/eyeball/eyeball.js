define([
    'core/model/entity/entity',
    'core/model/icon',
    'core/model/action/shooter',
    'core/model/entity/mortal',
    'core/model/item/item_dropper',
    'view/image_options',
    'controller/load_sprites'
], function(
    Entity,
    Icon,
    Shooter,
    Mortal,
    ItemDropper,
    ImageOptions,
    LoadSprites
    ) {

    LoadSprites.addSpriteSheet({url:"chains/monsters/eyeball/purple.png", name:"eyeball", map:[
        {x:  0, y: 0, width: 56, height:33},
        {x: 56, y: 0, width: 42, height:42},
        {x: 98, y: 0, width: 33, height:56},
        {x:131, y: 0, width: 42, height:42}
    ]});

    return function () {
        var my = Entity();

        Mortal(my);

        my.icon = Icon(my, SpriteSheets.eyeball);

        my.entityType = 'monster';
        my.life = 100;
        my.getFootPrint().setSize(56, 33);

        var moveFrame = 0;
        var maxMoveFrame = 60 * 2;
        var moveRadius = 72;

        var angleBase = 0;

        var isRotating = false;

        var rotation = [
            {i:2, a: Math.PI * ( 2/16)}, // key
            {i:3, a: Math.PI * ( 6/16)},
            {i:0, a: Math.PI * (10/16)}, // key
            {i:1, a: Math.PI * (14/16)},

            {i:2, a: Math.PI * (18/16)}, // key
            {i:3, a: Math.PI * (22/16)},
            {i:0, a: Math.PI * (26/16)}, // key
            {i:1, a: Math.PI * (30/16)},
            {i:2, a: Math.PI * (33/16)} // key
        ];

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

            for (var j = 0; j < rotation.length; j++) {
                if (angle < rotation[j].a) {
                    my.icon.spriteIndex = rotation[j].i;
                    break;
                }
            }

            var sprite = my.icon.getSprite();


            my.position.x = Math.cos(angle) * moveRadius + my.center.x - Math.floor(sprite.width / 2);
            my.position.y = Math.sin(angle) * moveRadius + my.center.y - Math.floor(sprite.height / 2);
        };

        my.setFrameTimeout(60, function () {
            isRotating = true;
        });

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
                    onQuarter();
                    lastStop = Math.floor(percent / 0.25);
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
                isRotating = false;

                my.setFrameTimeout(60, function () {
                    isRotating = true;
                    tillNextStop = Math.floor(Math.random() * 4 + 2);
                });
            }

        };


        return my;
    };
});
