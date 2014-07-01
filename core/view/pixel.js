



var Pixel = function(x, y, color) {

    var exports = {
        x: x,
        y: y
    };

    exports.sameColor = function(p) {
        return p.r == exports.r && p.g == exports.g && p.b == exports.b;
    };

    exports.getDrawColor = function() {
        return 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + (color.a / 255) + ')';
    };

    return exports;
};
