
var Entity = function() {

    var my = {
        position: new Position(0, 0),
        size: {width: 0, height: 0}
    };

    my.icon = Icon(my);

    my.executeFrame = function(room) {

    };

    return my;
};
