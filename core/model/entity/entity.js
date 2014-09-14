
var Entity = function() {

    var my = {
        room: null
    };

    FrameEventHaver(my);

    my.position = new Position(0, 0);

    my.footPrints = {};
    my.footPrints.default = new Rect(my.position, 0, 0, 0, 0);

    my.icon = null;

    my.executeFrame = function() {
        my.processEventQueue();
    };

    my.getFootPrint = function(type) {
        if (!type || !my.footPrints[type]) {return my.footPrints.default;}
        return my.footPrints[type];
    };

    my.drawEntity = function(ctx) {
        // todo allow for multiple icons per entity
        if (!my.icon) return;
        my.icon.drawIcon(ctx);
    };



    var freezeCount = 0;
    my.freeze = function() {
        freezeCount++;
    };
    my.unfreeze = function() {
        freezeCount--;
    };
    my.isFrozen = function() {
        return freezeCount > 0;
    };


    return my;
};


