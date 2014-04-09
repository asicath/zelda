var Actor = function(my) {

    my.action = null;
    my.specialAction = null;
    my.specialActionY = null;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

        updateInput(my.playerId);

        executeActions(room);

        executeFrame_parent(room);

    };

    var executeActions = function(room) {

        my.action.executeAction(room);

        if (my.specialAction) my.specialAction.executeAction(room);

        if (my.specialActionY) my.specialActionY.executeAction(room);
    };

    var updateInput = function(id) {

        if (playerInput[id].attack) {
            my.action.activateIntent = true;
        }
        else {
            my.action.activateIntent = false;
        }

        if (playerInput[id].special) {
            my.specialAction.activateIntent = true;
        }
        else {
            my.specialAction.activateIntent = false;
        }

        if (playerInput[id].specialY) {
            my.specialActionY.activateIntent = true;
        }
        else {
            my.specialActionY.activateIntent = false;
        }

    };

};
