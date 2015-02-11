// reads json and creates a room

define([
    '../rect',
    './room',
    'view/image_options'
], function(
    Rect,
    Room,
    ImageOptions
) {

    return function (data) {

        var my = Room(data);



        return my;
    };
});
