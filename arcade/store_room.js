

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

    var xOffset = (my.rect.width - (possible.length * 2 - 1) * 16) / 2 + 1;

    for (var i = 0; i < possible.length; i++) {
        var a = possible[i];
        var e = ActionItem(a.main, a.arg0);

        e.position.y = 8 * 11;



        e.position.x = 16 * i * 2 + xOffset;



        my.addEntity(e);
    }

    //my.setFrameTimeout(300, function() {
    //    my.onComplete();
    //});

    my.onComplete = function() {};

    return my;
};