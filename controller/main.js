


loadAllSprites(function() {
    loadRoomJson('assets/rooms/ow08-07.js', function(data) {

        currentRoom = DemoRoom(data);

        var cycle = DemoCycle(currentRoom);
        cycle.start();

        gamepadSupport.init();

        music.loop = true;
        //music.play();
    });
});

var currentRoom;

var loadRoomJson = function(filename, success) {

    $.getJSON(filename).done(function(data) {
        success(data);
    }).fail(function(e1, e2, e3) {
        console.log( "error" );
    });

};


