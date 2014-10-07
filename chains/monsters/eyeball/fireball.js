define(['core/model/entity/entity', 'core/model/icon', 'core/model/movement/missile', 'core/model/movement/mover', 'controller/load_sprites'], function(Entity, Icon, Missile, Mover, LoadSprites) {

    LoadSprites.addSpriteSheet({url:"chains/monsters/eyeball/fire.png", name:"eyeFireball"});

    return function (eyeball) {
        var my = Entity();

        my.icon = Icon(my, SpriteSheets.eyeFireball);

        Mover(my);

        my.movementSources.push(new Missile(my));

        my.wallSensitive = false;
        my.entityType = "fireball";

        my.getFootPrint().setSize(16, 16);

        my.position.x = eyeball.position.x;
        my.position.y = eyeball.position.y;

        var executeFrame_parent = my.executeFrame;
        my.executeFrame = function () {
            executeFrame_parent();

            // check for intersection
            var a = my.room.getIntersectingEntities(my, 'player', 'monsterHit');
            if (a) {
                var e;
                for (var i = a.length - 1; i >= 0; i--) {
                    e = a[i];
                    e.takeDamage(2, my);
                    my.room.removeEntity(my);
                }
            }

        };

        my.launch = function() {
            my.shootDirection(Directions.bottom, 204 / 68);
            my.icon.spriteIndex = 2;
        };

        my.onEdgeEvent = function (edge, rect) {
            my.room.removeEntity(my);
        };

        return my;
    };

});