define(['core/model/entity/entity', 'core/model/icon', 'core/model/movement/mover', 'core/model/movement/missile', 'controller/load_sprites'], function(Entity, Icon, Mover, Missile, LoadSprites) {

    LoadSprites.addSpriteSheet({url:"chains/weapons/flamesword/flaming_missile.png", name:"flamingmissile",
        map:[
            // up
            {x:0, y: 0, width: 13, height:18},
            {x:13, y: 0, width: 13, height:18},

            // down
            {x:26, y: 0, width: 13, height:18},
            {x:39, y: 0, width: 13, height:18},

            // Left
            {x:52, y: 0, width: 18, height:13},
            {x:70, y: 0, width: 18, height:13},

            // Right
            {x:88, y: 0, width: 18, height:13},
            {x:106, y: 0, width: 18, height:13}
        ]
    });

    return function () {
        var my = Entity();

        my.icon = Icon(my, SpriteSheets.flamingmissile);
        my.icon.startFlashing();

        var altFrame = 0, frame = 0;

        Mover(my);

        my.movementSources.push(new Missile(my));

        my.wallSensitive = false;
        my.entityType = "sword";

        my.getFootPrint().setSize(13, 18);

        my.onEdgeEvent = function (edge, rect) {
            my.room.removeEntity(my);
        };


        var spriteIndex = {};
        spriteIndex[Directions.top] = 0;
        spriteIndex[Directions.bottom] = 2;
        spriteIndex[Directions.left] = 4;
        spriteIndex[Directions.right] = 6;

        my.icon.spriteIndex = 3;

        my.icon.getSprite = function () {
            var index = spriteIndex[my.facing] + altFrame;
            return my.icon.spriteSheet.sprites[index];
        };

        var executeFrame_parent = my.executeFrame;
        my.executeFrame = function () {
            executeFrame_parent();
            frame++;
            altFrame = Math.floor(frame / 6) % 2;
        };

        return my;
    };

});
