
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