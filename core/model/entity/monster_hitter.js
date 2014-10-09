define(function() {

    return function (my) {

        var getMonsters = function(e) {
            return e.isMonster;
        };

        var executeFrame_parent = my.executeFrame;
        my.executeFrame = function () {

            executeFrame_parent();

            var a = my.room.getEntities([getMonsters, my.intersects]);
            if (a) {
                for (var i = a.length - 1; i >= 0; i--) {
                    my.onMonsterHit(a[i]);
                }
            }

        };

        my.onMonsterHit = function(monster) {};

    };

});