define(['core/model/entity/entity', 'core/model/icon', 'core/model/entity/monster_hitter', 'core/model/movement/mover', 'core/model/movement/missile', 'controller/load_sprites', './flame'], function(Entity, Icon, MonsterHitter, Mover, Missile, LoadSprites, Flame) {

    var spriteInfo = LoadSprites.addSpriteSheet({url:"chains/weapons/flamesword/flaming_missile.png", name:"flamingmissile",
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

    return function (player) {
        var my = Entity();

        my.playerId = player.playerId; // expose for kill counting in monster

        my.icon = Icon(my, spriteInfo.spriteSheet);
        my.icon.startFlashing();

        var altFrame = 0, frame = 0;

        MonsterHitter(my);
        Mover(my);

        my.movementSources.push(new Missile(my));

        my.wallSensitive = false;

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

            altFrame = Math.floor(++frame / 6) % 2;
        };

        my.onMonsterHit = function(monster) {
            monster.takeDamage(8, my);
            my.onHit();
        };

        my.onHit = function() {
            // drop a flame?
            var flame = new Flame();
            flame.position.x = my.position.x;
            flame.position.y = my.position.y;

            my.room.addEntity(flame);

            Sounds.candle.play();
        };

        return my;
    };

});
