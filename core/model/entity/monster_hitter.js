define(function() {

    return function (my) {

        var getMonsters = function(e) {
            return e.isMonster;
        };

        function checkForHit () {

            var a = my.room.getEntities([getMonsters, my.intersects]);
            if (a) {
                for (var i = a.length - 1; i >= 0; i--) {
                    my.onMonsterHit(a[i]);
                }
            }

        }

        my.addFrameItem('find', checkForHit);

        my.onMonsterHit = function(monster) {};

    };

});