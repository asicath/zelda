define(function() {

    return function (my) {

        var actions = [];

        my.setAction = function (action, inputName) {
            var i = 0;
            while (i < actions.length) {
                if (actions[i].inputName == inputName) break;
                i++;
            }
            actions[i] = {action: action, inputName: inputName};
        };

        var executeFrame_parent = my.executeFrame;
        my.executeFrame = function () {
            updateInput(my.playerInputIndex);
            executeActions();
            executeFrame_parent();
        };

        // Give the actions a frame of time
        var executeActions = function () {
            for (var i = 0; i < actions.length; i++) {
                actions[i].action.executeFrame();
            }
        };

        // Read playerInput object and map to actions
        var updateInput = function (id) {
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

});