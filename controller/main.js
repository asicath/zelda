var baseUrl = "";

var currentRoom;

var roomRunner = function() {
    loadAllSprites(function() {
        loadAllRooms(RunnerRoom, function(rooms) {

            var cycle = RoomRunnerCycle(rooms);
            cycle.start();

            gamepadSupport.init();

            music_normal.loop = true;
            //music_normal.play();

            music.loop = true;
            //music.play();
        });
    });
};

roomRunner();
