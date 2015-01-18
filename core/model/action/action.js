define(['core/model/directives'], function(Directives) {

    return function (actor) {
        var my = {};

        // Will be updated elsewhere to indicate action should be taking place
        my.activateIntent = false;

        var activated = false;
        var heldFrameCount = 0;
        var waitFrameCount = 0;

        my.executeFrame = function () {

            // Intent detected, activate!
            if (my.activateIntent && !activated && !actor.isFrozen()) {
                my.onActivate();
                activated = true;
                heldFrameCount = 0;

                if (!my.isMain) {
                    Directives.nextMessage(5);
                }
            }

            // Intent Removed, deactivate
            else if (!my.activateIntent && activated) {
                my.onDeactivate();
                activated = false;
                waitFrameCount = 0;
            }

            // Intent held for more than one frame
            else if (activated) {
                my.onHold(++heldFrameCount);
            }

            else {
                my.onWait(++waitFrameCount);
            }

        };

        my.onActivate = function () {
        };

        my.onDeactivate = function () {
        };

        my.onHold = function (frames) {
        };

        my.onWait = function (frames) {
        };

        return my;
    };

});