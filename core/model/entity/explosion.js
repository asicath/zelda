define(function() {

    var ExplosionPart = function (angle) {
        var my = Entity();

        my.icon = Icon(my, SpriteSheets.explosion);
        my.icon.startFlashing();

        Mover(my);

        my.movementSources.push(new Missile(my));

        my.entityType = "explosion";


        // Launch by default
        my.shoot(angle, 30 / 22);

        var frame = 0;

        var executeFrame_parent = my.executeFrame;
        my.executeFrame = function () {
            executeFrame_parent();

            if (frame++ == 22) {
                my.room.removeEntity(my);
            }

        };

        /*
         my.icon.flashPalates = [
         Palettes.DeathStarRedBlue, // should be all blue
         Palettes.DeathStarWhiteGold,
         Palettes.DeathStarWhiteBlue,
         Palettes.DeathStarRedGold
         ];
         */

        my.onEdgeEvent = function (edge, rect) {
            return true;
        };


        return my;
    };

    return function (room, x, y) {
        var ex1 = ExplosionPart(Math.PI * 0.25);
        ex1.position.x = x + 4;
        ex1.position.y = y + 4;
        ex1.icon.spriteIndex = 3;
        room.addEntity(ex1);

        var ex2 = ExplosionPart(Math.PI * 0.75);
        ex2.position.x = x;
        ex2.position.y = y + 4;
        ex2.icon.spriteIndex = 2;
        room.addEntity(ex2);

        var ex3 = ExplosionPart(Math.PI * 1.25);
        ex3.position.x = x;
        ex3.position.y = y;
        ex3.icon.spriteIndex = 0;
        room.addEntity(ex3);

        var ex4 = ExplosionPart(Math.PI * 1.75);
        ex4.position.x = x + 4;
        ex4.position.y = y;
        ex4.icon.spriteIndex = 1;
        room.addEntity(ex4);
    };

});