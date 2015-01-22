define([
    './player_room'
], function(
    PlayerRoom
) {

    return function (data, Monster, randomPosition) {

        var my = PlayerRoom(data);

        var addMonster = function() {
            var e = Monster();
            if (randomPosition) my.addEntityAtOpenTile(e);
            else {my.addEntity(e);}

            e.onDeath = function() {
                my.setFrameTimeout(60, addMonster);
                my.setFrameTimeout(120, addMonster);
            }
        };

        // add the monster after a second
        my.setFrameTimeout(60, function () {
            //my.title = "boss";
            addMonster();
        });

        return my;
    };

});