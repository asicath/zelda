var Actor = function(my) {

    var actions = [];

    my.setAction = function(action, inputName) {
        var i = 0;
        while (i < actions.length) {
            if (actions[i].inputName == inputName) break;
            i++;
        }
        actions[i] = {action: action, inputName: inputName};
    };

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

        updateInput(my.playerId);

        executeActions(room);

        executeFrame_parent(room);

    };

    // Give the actions a frame of time
    var executeActions = function(room) {
        for (var i = 0; i < actions.length; i++) {
            actions[i].action.executeAction(room);
        }
    };

    // Read playerInput object and map to actions
    var updateInput = function(id) {
        for (var i = 0; i < actions.length; i++) {
            var action = actions[i];
            if (playerInput[id][action.inputName]) {
                action.action.activateIntent = true;
            }
            else {
                action.action.activateIntent = false;
            }
        }
    };

};
