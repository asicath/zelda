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
            var filepath = 'assets/rooms/ow' + xVal + '-' + yVal + '.js';
            loadRoomJson(key, filepath, function(data, key) {

                rooms[key] = roomModel(data);
                onLoadComplete();
            });

        }
    }


};




var currentRoom;

var runDemo = function() {

    loadAllSprites(function() {
        loadRoomJson('', 'assets/rooms/ow08-07.js', function(data) {

            currentRoom = DemoRoom(data);

            var cycle = DemoCycle(currentRoom);
            cycle.start();

            gamepadSupport.init();

            music.loop = true;
            //music.play();
        });
    });

};

var roomRunner = function() {
    loadAllSprites(function() {
        loadAllRooms(RunnerRoom, function(rooms) {

            //currentRoom = rooms['08_07'];

            var cycle = RoomRunnerCycle(rooms);
            cycle.start();

            gamepadSupport.init();

            music.loop = true;
            //music.play();
        });
    });
};






roomRunner();
