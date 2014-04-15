



var Pixel = function(i, x, y) {

    var exports = {
        i: i,
        x: x,
        y: y
    };

    exports.sameColor = function(p) {
        return p.r == exports.r && p.g == exports.g && p.b == exports.b;
    };

    exports.getColor = function(palette) {
        if (!palette) {
            palette = Palettes.Default;
        }
        var color = palette.colors[exports.i];

        if (color[3] == 0) {
            return null;
        }

        return 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')';
    };

    return exports;
};
