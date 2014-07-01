



var Pixel = function(i, x, y, naturalColor) {

    var exports = {
        i: i,
        x: x,
        y: y,
        naturalColor: naturalColor
    };

    exports.sameColor = function(p) {
        return p.r == exports.r && p.g == exports.g && p.b == exports.b;
    };

    exports.getColor = function() {
        return exports.getNaturalColor();
    };

    exports.getNaturalColor = function() {
        return 'rgba(' + naturalColor.r + ', ' + naturalColor.g + ', ' + naturalColor.b + ', ' + (naturalColor.a / 255) + ')';
    };

    return exports;
};
