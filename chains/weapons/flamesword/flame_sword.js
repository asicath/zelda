define(['core/model/entity/entity', 'core/model/icon', 'controller/load_sprites'], function(Entity, Icon, LoadSprites) {

    LoadSprites.addSpriteSheet({url:"chains/weapons/flamesword/flamingsword.png", name:"flamingsword",map:[
        {x:0, y: 0, width: 9, height:18},
        {x:9, y: 0, width: 9, height:18},
        {x:18, y: 0, width: 9, height:18},
        {x:27, y: 0, width: 9, height:18},
        {x:36, y: 0, width: 18, height:9},
        {x:36, y: 9, width: 18, height:9},
        {x:54, y: 0, width: 18, height:9},
        {x:54, y: 9, width: 18, height:9},

        // Also the normal sword
        {x:72, y: 0, width: 9, height:18},
        {x:81, y: 0, width: 9, height:18},
        {x:90, y: 0, width: 18, height:9},
        {x:90, y: 9, width: 18, height:9}
    ]});

    var spriteIndexFlaming = {};
    spriteIndexFlaming[Directions.top] = 0;
    spriteIndexFlaming[Directions.bottom] = 2;
    spriteIndexFlaming[Directions.left] = 4;
    spriteIndexFlaming[Directions.right] = 6;

    var spriteIndexNormal = {};
    spriteIndexNormal[Directions.top] = 8;
    spriteIndexNormal[Directions.bottom] = 9;
    spriteIndexNormal[Directions.left] = 10;
    spriteIndexNormal[Directions.right] = 11;


    return function(player) {
        var my = Entity();

        my.icon = Icon(my, SpriteSheets.flamingsword);

        my.entityType = "sword";
        my.playerId = player.playerId; // expose for kill counting in monster
        my.player = player;             // expose so items can be picked up by swords

        var frame = 0;

        var alt = 0;

        var flaming = false;
        my.icon.startFlashing(4);

        my.flameOn = function() {
            flaming = true;
            my.icon.stopFlashing();
            Sounds.candle.play();
        };

        my.icon.getSprite = function () {

            var index = 0;

            if (flaming) {
                index = spriteIndexFlaming[my.facing] + alt;
            }
            else {
                index = spriteIndexNormal[my.facing];
            }

            return my.icon.spriteSheet.sprites[index];
        };

        var executeFrame_parent = my.executeFrame;
        my.executeFrame = function () {
            executeFrame_parent();

            frame++;

            alt = Math.floor(frame / 6) % 2;

            // check for intersection
            var a = my.room.getIntersectingEntities(my, 'monster');
            if (a) {
                for (var i = a.length - 1; i >= 0; i--) {
                    a[i].takeDamage(4, my);
                    my.onHit();
                }
            }

        };

        my.onHit = function () {

        };

        return my;
    };

});