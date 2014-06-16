var Action = function(actor) {
    var my = {};

    // Will be updated elsewhere to indicate action should be taking place
    my.activateIntent = false;

    var activated = false;
    var heldFrameCount = 0;

    my.executeAction = function(room) {

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
        }

        // Intent held for more than one frame
        else if (activated) {
            my.onHold(room, ++heldFrameCount);
        }

    };

    my.onActivate = function(room) {};

    my.onDeactivate = function(room) {};

    my.onHold = function(room, frames) {};

    return my;
};
