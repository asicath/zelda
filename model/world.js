
var World = function() {
    var my = {};


    my.activeRoom = null;

    my.executeFrame = function() {
        my.activeRoom.executeFrame();
    };

    return my;
};