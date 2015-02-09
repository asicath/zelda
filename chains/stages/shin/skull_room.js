define([
    'dev/player_room',
    'chains/stages/shin/skull/skull'
], function(
    PlayerRoom,
    Skull
) {

    return function (data) {

        var my = PlayerRoom(data);

        var leftSkull, rightSkull;

        var addSkulls = function() {
            var leftSkull = Skull();
            leftSkull.position.x = 64;
            leftSkull.position.y = 64;
            my.addEntity(leftSkull);
        };

        // add the monster after a second
        //my.setFrameTimeout(60, function () {
            //my.title = "boss";
            addSkulls();
        //});

        return my;
    };

});