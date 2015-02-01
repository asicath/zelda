define([
    'core/model/rooms/room',
    'core/model/entity/player',
    'core/model/action/drop_bomb',
    'core/model/entity/live_bomb',
    'core/model/action/throw_boomerang',
    'controller/input',
    'core/model/directives'
], function(
    Room,
    Player,
    DropBomb,
    LiveBomb,
    ThrowBoomerang,
    playerInput,
    Directives
    ) {

    return function (data) {
        var my = Room(data);

        // *** Players ***
        my.players = [];
        var playerInputMap = {};
        var createPlayer = function (playerId, playerInputIndex) {
            var p = Player(playerId, playerInputIndex);
            my.players[playerId] = p;

            p.addAltAction(DropBomb(p, LiveBomb));
            p.addAltAction(ThrowBoomerang(p));

            my.addEntityAtOpenTile(my.players[playerId]);

            // advance message
            Directives.nextMessage(0);
        };

        var checkForPlayerAdd = function () {
            // check for player creation
            for (var i = 0; i < playerInput.length; i++) {
                if (!playerInput[i]) continue;

                if (playerInput[i].start) {

                    var playerId = playerInput[i].playerId;

                    // create playerId
                    if (typeof playerId === 'undefined') {
                        var max = -1;
                        for (var j = 0; j < playerInput.length; j++) {
                            if (playerInput[j] && typeof playerInput[j].playerId !== 'undefined')
                                max = playerInput[j].playerId > max ? playerInput[j].playerId : max;
                        }
                        playerId = max + 1;
                        playerInput[i].playerId = playerId;
                    }

                    // Allow start if possible
                    if (!my.players[playerId] || my.players[playerId].isDead) {
                        createPlayer(playerId, i);
                    }
                }
            }
        };

        var executeFrame_parent = my.executeFrame;
        my.executeFrame = function () {
            checkForPlayerAdd();
            executeFrame_parent();
        };

        my.onComplete = function () {

        };

        return my;
    };
});