
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



var FrameEventHaver = function(my) {

    var eventQueue = [];

    my.setFrameTimeout = function(frames, event) {
        eventQueue.push(FrameEvent(frames, event));
    };

    my.processEventQueue = function() {
        if (eventQueue.length > 0) {
            for (var i = eventQueue.length - 1; i >= 0; i--) {
                eventQueue[i].executeFrame();
                if (eventQueue[i].complete) {
                    eventQueue.splice(i, 1);
                }
            }
        }
    };

};

var FrameEvent = function(frames, execute) {
    var my = {
        complete: false
    };

    var framesUntilExecute = frames;

    my.executeFrame = function() {
        if (--framesUntilExecute == 0) {
            execute();
            my.complete = true;
        }
    };

    return my;
};