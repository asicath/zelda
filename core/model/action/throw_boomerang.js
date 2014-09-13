define(['./action', '../entity/boomerang'], function(Action, Boomerang) {

    return function (actor) {
        var my = Action(actor);

        my.weaponIconIndex = 5;

        my.onActivate = function () {
            var boom = Boomerang(actor, actor.facing);

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

            boom.position.x = x;
            boom.position.y = y;

            actor.room.addEntity(boom);
            //Sounds.bombDrop.play();
        };

        return my;
    };

});