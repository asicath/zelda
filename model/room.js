
var loadRoom = function(filename, success) {
    $.getJSON(filename).done(function(data) {

        var room = Room(data);
        success(room);

    }).fail(function(e1, e2, e3) {
        console.log( "error" );
    });
};


var Room = function(data) {
    var my = {};

    my.tiles = data.tiles;
    my.entities = [];

    my.playerEntity = PlayerEntity();
    my.entities.push(my.playerEntity);

    my.sprites = Sprites.outside;

    my.rect = Rect(0, 0, 256, 176);

    my.executeFrame = function(world) {

        // do room stuff

        // do entities
        for (var i = my.entities.length-1; i >= 0; i--) {
            my.entities[i].executeFrame(my);
        }

    };

    return my;
};