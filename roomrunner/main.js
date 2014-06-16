var baseUrl = "../core/";

var currentRoom;

var roomRunner = function() {

    Sounds.loadAll();
    Music.loadAll();


    loadAllSprites(function() {
        loadAllRooms(RunnerRoom, function(rooms) {

            var cycle = RoomRunnerCycle(rooms);
            cycle.start();

            gamepadSupport.init();

            Music.normal.loop = true;
            Music.normal.play();
        });
    });
};

roomRunner();
