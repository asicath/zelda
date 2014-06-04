



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

    exports.getColor = function(palette) {

        if (exports.i == -1)
            return exports.getNaturalColor();

        if (!palette) {
            palette = Palettes.Default;
        }
        var color = palette.colors[exports.i];

        if (color[3] == 0) {
            return null;
        }

        return 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')';
    };

    exports.getNaturalColor = function() {
        return 'rgba(' + naturalColor.r + ', ' + naturalColor.g + ', ' + naturalColor.b + ', ' + (naturalColor.a / 255) + ')';
    };

    return exports;
};
