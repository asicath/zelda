
var Color = function(r, g, b, a) {
    var my = {};

    my.getDrawColor = function() {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (a / 255) + ')';
    };

    my.equals = function(p) {
        return p.getDrawColor() == my.getDrawColor();
    };

    return my;
};


var Pixel = function(x, y, color) {

    var exports = {
        x: x,
        y: y,
        color: color
    };

    return exports;
};
