define([
    'arcade/player_room',
    '../core/model/action/drop_bomb',
    '../core/model/entity/live_bomb',
    '../core/model/entity/big_bomb',
    '../core/model/action/protection',
    '../core/model/action/sword_rain',
    '../core/model/entity/edge',
    '../core/model/item/action_item'
], function(
    PlayerRoom,
    DropBomb,
    LiveBomb,
    BigBomb,
    Protection,
    SwordRain,
    Edge,
    ActionItem
    ) {

    var musicStore = new Audio("music/DISTANCE.mp3");

    return function (data) {
        var my = PlayerRoom(data);


        musicStore.play();

        // Treasure room
        var count = 0;
        var target = 4;

        var possible = [
            {main: SwordRain, cost: 10},
            {main: Protection, cost: 10},
            {main: DropBomb, arg0: LiveBomb, cost: 10},
            {main: DropBomb, arg0: BigBomb, cost: 10}
        ];

        var xOffset = (my.rect.width - (possible.length * 2 - 1) * 16) / 2 + 1;
        for (var i = 0; i < possible.length; i++) {
            var a = possible[i];
            var e = ActionItem(a.cost, a.main, a.arg0);
            e.position.y = 8 * 11;
            e.position.x = 16 * i * 2 + xOffset;
            my.addEntity(e);
        }

        var playerPositions = [
            {x: 120 - 8 * 2, y: 8 * 16},
            {x: 120 + 8 * 2, y: 8 * 16},
            {x: 120 - 8 * 5, y: 8 * 16},
            {x: 120 + 8 * 5, y: 8 * 16}
        ];

        var playersAdd = 0;

        my.addEntityAtOpenTile = function (entity) {
            var i = playersAdd++;
            entity.position.x = playerPositions[i].x;
            entity.position.y = playerPositions[i].y;
            my.addEntity(entity);
        };

        // create the exit
        var exited = 0;
        var exit = new Edge(Directions.bottom, function (player) {
            my.removeEntity(player);
            if (++exited == my.players.length) {

                musicStore.pause();
                musicStore.load();
                my.setFrameTimeout(30, my.onComplete);


            }
        });

        my.addEntity(exit);


        my.onComplete = function () {
        };

        return my;
    };

});