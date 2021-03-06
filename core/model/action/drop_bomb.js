define(['./action', '../entity/big_bomb', 'core/controller/sound'], function(Action, BigBomb, Sound) {

    var sound = Sound('core/assets/sounds/bomb_drop.wav');

    return function (actor, type) {
        var my = Action(actor);

        my.weaponIconIndex = 0;

        if (type == BigBomb) my.weaponIconIndex = 1;

        my.onActivate = function () {
            var bomb = type(actor);

            var x = actor.position.x;
            var y = actor.position.y;

            switch (actor.facing) {
                case Directions.bottom:
                    y += 17;
                    break;
                case Directions.top:
                    y -= 17;
                    break;
                case Directions.left:
                    y -= 1;
                    x -= 17;
                    break;
                case Directions.right:
                    y -= 1;
                    x += 17;
                    break;
            }

            bomb.position.x = x;
            bomb.position.y = y;

            actor.room.addEntity(bomb);
            sound.play();
        };

        return my;
    };

});