define([
    './player_room'
], function(
    PlayerRoom
) {

    return function (data, Monster) {

        var my = PlayerRoom(data);

        // add the monster after a second
        my.setFrameTimeout(60, function () {
            //my.title = "boss";
            var e = Monster();
            my.addEntity(e);
        });

        return my;
    };

});