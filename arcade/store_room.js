

var StoreRoom = function(data) {
    var my = PlayerRoom(data);


    // Treasure room
    var count = 0;
    var target = 10;

    var addTreasure = function() {

        // create the entity
        var e;
        if (Math.random() > 0.5) {
            e = Rupee();
        }
        else {
            e = Heart();
        }

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