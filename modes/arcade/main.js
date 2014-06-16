var baseUrl = "../../";

var currentRoom;

var runDemo = function() {

    loadAllSprites(function() {
        loadRoomJson('', baseUrl + 'assets/rooms/ow08-07.js', function(data) {

            currentRoom = DemoRoom(data);

            var cycle = DemoCycle(currentRoom);
            cycle.start();

            gamepadSupport.init();

            music.loop = true;
            //music.play();
        });
    });

};

runDemo();

