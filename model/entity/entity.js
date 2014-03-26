
var Entity = function() {

    var my = {};

    my.position = new Position(0, 0);
    my.rect = new Rect(my.position, 0, 0, 0, 0); // TODO make private eventually

    my.footPrints = {};
    my.footPrints.default = my.rect;

    my.icon = Icon(my);

    my.executeFrame = function(room) {};

    my.getFootPrint = function(type) {
        if (!type || !my.footPrints[type]) {return my.footPrints.default;}
        return my.footPrints[type];
    };

    return my;
};
