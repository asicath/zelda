define(function() {

    return function (my) {

        var getPlayers = function(e) {
            return e.isPlayer;
        };

        var getCoreIntersects = function(e) {
            var theirs = e.getFootPrint('monsterHit');
            var mine = my.getFootPrint();

            // check for intersection
            return mine.intersects(theirs);
        };

        var executeFrame_parent = my.executeFrame;
        my.executeFrame = function () {

            executeFrame_parent();

            var a = my.room.getEntities([getPlayers, getCoreIntersects]);
            if (a) {
                for (var i = a.length - 1; i >= 0; i--) {
                    my.onPlayerHit(a[i]);
                }
            }

        };

        my.onPlayerHit = function(player) {};



    };

});