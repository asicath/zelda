var baseUrl = "../core/";

var currentRoom;

var runDemo = function() {

    Sounds.loadAll();
    Music.loadAll();

    loadAllSprites(function() {
        loadRoomJson('', baseUrl + 'assets/rooms/ow08-07.js', function(data) {

            currentRoom = DemoRoom(data);

            var cycle = DemoCycle(currentRoom);
            cycle.start();

            gamepadSupport.init();

            Music.eightBit.loop = true;
            Music.eightBit.play();
        });
    });

};

runDemo();

