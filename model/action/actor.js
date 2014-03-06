var Actor = function(my) {
    var my = my || Entity();

    my.action = null;
    my.specialAction = null;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

        updateInput(my.playerId);

        executeActions(room);

        executeFrame_parent(room);

    };

    var executeActions = function(room) {
        my.action.executeAction(room);
        my.specialAction.executeAction(room);
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

        /*
        if (playerInput[id].flash) {
            my.flashing = true;
        }
        else if (my.flashing) {
            my.flashing = false;
        }
        */

    };



    return my;
};