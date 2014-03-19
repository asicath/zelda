
var Entity = function() {

    var my = {};

    my.position = new Position(0, 0);
    my.rect = new Rect(my.position, 0, 0, 0, 0);

    my.icon = Icon(my);

    my.executeFrame = function(room) {

    };

    return my;
};
