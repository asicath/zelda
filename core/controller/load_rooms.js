define(['jquery', 'view/sprite_sheet'], function($, SpriteSheet) {

    var loadRoomJson = function (key, filename, success) {

        $.getJSON(filename).done(function (data) {
            success(data, key);
        }).fail(function (e1, e2, e3) {
            console.log("error");
        });

    };

    var loadRoomJsonFromOverlay = function (imageSheet, overlaySheet, key) {
        return {
            key: key,
            tiles: null,
            overlay: {
                sprite: imageSheet.sprites,
                overlay: overlaySheet.sprites
            }
        };
    };

    var loadAllRooms = function (roomModel, success) {
        var rooms = {};
        var toLoad = 16 * 8;

        var onLoadComplete = function () {
            if (--toLoad == 0) {
                success(rooms);
            }
        };


        for (var x = 0; x <= 15; x++) {
            for (var y = 0; y <= 7; y++) {

                var xVal = x.toString();
                if (xVal.length == 1) xVal = "0" + xVal;

                var yVal = y.toString();
                if (yVal.length == 1) yVal = "0" + yVal;

                var key = xVal + '_' + yVal;

                if (key == '07_07') {

                }
                else {
                    var filepath = requirejs.s.contexts._.config.baseUrl + 'core/assets/rooms/ow' + xVal + '-' + yVal + '.js';
                    loadRoomJson(key, filepath, function (data, key) {
                        data.key = key;

                        rooms[key] = roomModel(data);
                        onLoadComplete();
                    });
                }

            }
        }


    };

    return {
        loadRoomJson: loadRoomJson,
        loadRoomJsonFromOverlay: loadRoomJsonFromOverlay,
        loadAllRooms: loadAllRooms
    };

});
