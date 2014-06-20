var Action = function(actor) {
    var my = {};

    // Will be updated elsewhere to indicate action should be taking place
    my.activateIntent = false;

    var activated = false;
    var heldFrameCount = 0;
    var waitFrameCount = 0;

    my.executeFrame = function(room) {

        // Intent detected, activate!
        if (my.activateIntent && !activated) {
            my.onActivate(room);
            activated = true;
            heldFrameCount = 0;
        }

        // Intent Removed, deactivate
        else if (!my.activateIntent && activated) {
            my.onDeactivate(room);
            activated = false;
            waitFrameCount = 0;
        }

        // Intent held for more than one frame
        else if (activated) {
            my.onHold(room, ++heldFrameCount);
        }

        else {
            my.onWait(room, ++waitFrameCount);
        }

    };

    my.onActivate = function(room) {};

    my.onDeactivate = function(room) {};

    my.onHold = function(room, frames) {};

    my.onWait = function(room, frames) {};

    return my;
};
