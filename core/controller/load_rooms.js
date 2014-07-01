var loadRoomJson = function(key, filename, success) {

    $.getJSON(filename).done(function(data) {
        success(data, key);
    }).fail(function(e1, e2, e3) {
        console.log( "error" );
    });

};

var loadAllRooms = function(roomModel, success) {
    var rooms = {};
    var toLoad = 16*8;

    var onLoadComplete = function() {
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

            var filepath = baseUrl + 'assets/rooms/ow' + xVal + '-' + yVal + '.js';
            loadRoomJson(key, filepath, function(data, key) {
                data.key = key;
                if (key == '07_07') {
                    data.tiles = null;

                    data.overlay = {
                        imageUrl: 'assets/rooms/testroom.gif',
                        overlayUrl: 'assets/rooms/testroom_overlay.gif'
                    };

                    loadSpriteSheetFromImgUrl(data.overlay.imageUrl,[{x:0,  y: 0, width: 256, height:176}], function(sheet) {

                        data.overlay.sprite = sheet.natural;

                        loadSpriteSheetFromImgUrl(data.overlay.overlayUrl,[{x:0,  y: 0, width: 256, height:176}], function(overlay) {
                            data.overlay.overlay = overlay.natural;
                            rooms[key] = roomModel(data);
                            onLoadComplete();
                        });
                    }, true);

                }
                else {
                    rooms[key] = roomModel(data);
                    onLoadComplete();
                }


            });

        }
    }


};
