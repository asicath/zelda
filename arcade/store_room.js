

var StoreRoom = function(data) {
    var my = PlayerRoom(data);


    // Treasure room
    var count = 0;
    var target = 4;

    var possible = [
        {main:SwordRain},
        {main:Protection},
        {main:DropBomb, arg0: LiveBomb},
        {main:DropBomb, arg0: BigBomb}
    ];

    var addTreasure = function() {

        // create the entity


        var r = Math.floor(Math.random() * possible.length);
        var a = possible[r];
        var e = ActionItem(a.main, a.arg0);

        // find a spot for it
        my.addEntityAtOpenTile(e);

        if (++count < target)
            my.setFrameTimeout(10, addTreasure);
    };

    my.setFrameTimeout(30, addTreasure);

    my.setFrameTimeout(300, function() {
        my.onComplete();
    });

    my.onComplete = function() {};

    return my;
};