var Color = function(r, g, b, a) {
    var my = {};

    my.getDrawColor = function() {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (a / 255) + ')';
    };

    my.equals = function(c) {
        return c.getDrawColor() == my.getDrawColor();
    };

    return my;
};

Color.fromNESPalette = function(hex) {
    var c = NESPalette["h" + hex];
    return Color(c[0], c[1], c[2], 255);
};
