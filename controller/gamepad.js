//http://www.html5rocks.com/en/tutorials/doodles/gamepad/

var gamepadSupport = {
    // A number of typical buttons recognized by Gamepad API and mapped to standard controls. Any extraneous buttons will have larger indexes.
    TYPICAL_BUTTON_COUNT: 16,

    // A number of typical axes recognized by Gamepad API and mapped to standard controls. Any extraneous buttons will have larger indexes.
    TYPICAL_AXIS_COUNT: 4,

    // Whether we’re requestAnimationFrameing like it’s 1999.
    ticking: false,

    // The canonical list of attached gamepads, without “holes” (always starting at [0]) and unified between Firefox and Chrome.
    gamepads: [],

    // Remembers the connected gamepads at the last check; used in Chrome to figure out when gamepads get connected or disconnected, since no events are fired.
    prevRawGamepadTypes: [],

    // Previous timestamps for gamepad state; used in Chrome to not bother with analyzing the polled data if nothing changed (timestamp is the same as last time).
    prevTimestamps: [],

    /**
     * Initialize support for Gamepad API.
     */
    init: function() {
        // As of writing, it seems impossible to detect Gamepad API support
        // in Firefox, hence we need to hardcode it in the third clause.
        // (The preceding two clauses are for Chrome.)
        var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads || (navigator.userAgent.indexOf('Firefox/') != -1);

        if (!gamepadSupportAvailable) {
            // It doesn’t seem Gamepad API is available – show a message telling
            // the visitor about it.
            //tester.showNotSupported();
            console.log('gamepad not supported by browser')
        } else {
            // Firefox supports the connect/disconnect event, so we attach event
            // handlers to those.
            window.addEventListener('MozGamepadConnected', gamepadSupport.onGamepadConnect, false);
            window.addEventListener('MozGamepadDisconnected', gamepadSupport.onGamepadDisconnect, false);

            // Since Chrome only supports polling, we initiate polling loop straight
            // away. For Firefox, we will only do it if we get a connect event.
            if (!!navigator.webkitGamepads || !!navigator.webkitGetGamepads) {
                //gamepadSupport.startPolling();
            }
        }
    },

    /**
     * React to the gamepad being connected. Today, this will only be executed
     * on Firefox.
     */
    onGamepadConnect: function(event) {
        // Add the new gamepad on the list of gamepads to look after.
        gamepadSupport.gamepads.push(event.gamepad);

        // Ask the tester to update the screen to show more gamepads.
        console.log(gamepadSupport.gamepads);

        // Start the polling loop to monitor button changes.
        //gamepadSupport.startPolling();
    },

    // This will only be executed on Firefox.
    onGamepadDisconnect: function(event) {
        // Remove the gamepad from the list of gamepads to monitor.
        for (var i in gamepadSupport.gamepads) {
            if (gamepadSupport.gamepads[i].index == event.gamepad.index) {
                gamepadSupport.gamepads.splice(i, 1);
                break;
            }
        }

        // If no gamepads are left, stop the polling loop.
        if (gamepadSupport.gamepads.length == 0) {
            //gamepadSupport.stopPolling();
        }

        // Ask the tester to update the screen to remove the gamepad.
        console.log(gamepadSupport.gamepads);
    },




    /**
     * Checks for the gamepad status. Monitors the necessary data and notices
     * the differences from previous state (buttons for Chrome/Firefox,
     * new connects/disconnects for Chrome). If differences are noticed, asks
     * to update the display accordingly. Should run as close to 60 frames per
     * second as possible.
     */
    pollStatus: function() {
        // Poll to see if gamepads are connected or disconnected. Necessary
        // only on Chrome.
        gamepadSupport.pollGamepads();

        for (var i in gamepadSupport.gamepads) {
            var gamepad = gamepadSupport.gamepads[i];

            // Don’t do anything if the current timestamp is the same as previous
            // one, which means that the state of the gamepad hasn’t changed.
            // This is only supported by Chrome right now, so the first check
            // makes sure we’re not doing anything if the timestamps are empty
            // or undefined.
            if (gamepad.timestamp &&
                (gamepad.timestamp == gamepadSupport.prevTimestamps[i])) {
                continue;
            }
            gamepadSupport.prevTimestamps[i] = gamepad.timestamp;

            gamepadSupport.updateDisplay(i);
        }
    },

    // This function is called only on Chrome, which does not yet support
    // connection/disconnection events, but requires you to monitor
    // an array for changes.
    pollGamepads: function() {

        // Get the array of gamepads – the first method (function call)
        // is the most modern one, the second is there for compatibility with
        // slightly older versions of Chrome, but it shouldn’t be necessary
        // for long.
        var rawGamepads = (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) || navigator.webkitGamepads;

        if (rawGamepads) {
            // We don’t want to use rawGamepads coming straight from the browser,
            // since it can have “holes” (e.g. if you plug two gamepads, and then
            // unplug the first one, the remaining one will be at index [1]).
            gamepadSupport.gamepads = [];

            // We only refresh the display when we detect some gamepads are new
            // or removed; we do it by comparing raw gamepad table entries to
            // “undefined.”
            var gamepadsChanged = false;

            for (var i = 0; i < rawGamepads.length; i++) {
                if (typeof rawGamepads[i] != gamepadSupport.prevRawGamepadTypes[i]) {
                    gamepadsChanged = true;
                    gamepadSupport.prevRawGamepadTypes[i] = typeof rawGamepads[i];
                }

                if (rawGamepads[i]) {
                    gamepadSupport.gamepads.push(rawGamepads[i]);
                }
            }

            // Ask the tester to refresh the visual representations of gamepads
            // on the screen.
            if (gamepadsChanged) {
                // tester.updateGamepads
                console.log(gamepadSupport.gamepads);
            }
        }
    },

    // Call the tester with new state and ask it to update the visual representation of a given gamepad.
    updateDisplay: function(gamepadId) {
        var gamepad = gamepadSupport.gamepads[gamepadId];

        var playerId = parseInt(gamepadId);

        // dpad
        playerInput[playerId].up = gamepad.buttons[12] > 0;
        playerInput[playerId].down = gamepad.buttons[13] > 0;
        playerInput[playerId].left = gamepad.buttons[14] > 0;
        playerInput[playerId].right = gamepad.buttons[15] > 0;

        /*
        var threshold = 0.3;
        playerInput.up = gamepad.axes[1] < -threshold;
        playerInput.down = gamepad.axes[1] > threshold;
        playerInput.left = gamepad.axes[0] < -threshold;
        playerInput.right = gamepad.axes[0] > threshold;
        */


        //playerInput[playerId].flash = gamepad.buttons[0] > 0;
        playerInput[playerId].attack = gamepad.buttons[0] > 0;

        /*

        // Update all the buttons (and their corresponding labels) on screen.
        tester.updateButton(gamepad.buttons[0], gamepadId, 'button-1');
        tester.updateButton(gamepad.buttons[1], gamepadId, 'button-2');
        tester.updateButton(gamepad.buttons[2], gamepadId, 'button-3');
        tester.updateButton(gamepad.buttons[3], gamepadId, 'button-4');

        tester.updateButton(gamepad.buttons[4], gamepadId,
            'button-left-shoulder-top');
        tester.updateButton(gamepad.buttons[6], gamepadId,
            'button-left-shoulder-bottom');
        tester.updateButton(gamepad.buttons[5], gamepadId,
            'button-right-shoulder-top');
        tester.updateButton(gamepad.buttons[7], gamepadId,
            'button-right-shoulder-bottom');

        tester.updateButton(gamepad.buttons[8], gamepadId, 'button-select');
        tester.updateButton(gamepad.buttons[9], gamepadId, 'button-start');

        tester.updateButton(gamepad.buttons[10], gamepadId, 'stick-1');
        tester.updateButton(gamepad.buttons[11], gamepadId, 'stick-2');

        tester.updateButton(gamepad.buttons[12], gamepadId, 'button-dpad-top');
        tester.updateButton(gamepad.buttons[13], gamepadId, 'button-dpad-bottom');
        tester.updateButton(gamepad.buttons[14], gamepadId, 'button-dpad-left');
        tester.updateButton(gamepad.buttons[15], gamepadId, 'button-dpad-right');

        // Update all the analogue sticks.
        tester.updateAxis(gamepad.axes[0], gamepadId,
            'stick-1-axis-x', 'stick-1', true);
        tester.updateAxis(gamepad.axes[1], gamepadId,
            'stick-1-axis-y', 'stick-1', false);
        tester.updateAxis(gamepad.axes[2], gamepadId,
            'stick-2-axis-x', 'stick-2', true);
        tester.updateAxis(gamepad.axes[3], gamepadId,
            'stick-2-axis-y', 'stick-2', false);

        // Update extraneous buttons.
        var extraButtonId = gamepadSupport.TYPICAL_BUTTON_COUNT;
        while (typeof gamepad.buttons[extraButtonId] != 'undefined') {
            tester.updateButton(gamepad.buttons[extraButtonId], gamepadId,
                'extra-button-' + extraButtonId);

            extraButtonId++;
        }

        // Update extraneous axes.
        var extraAxisId = gamepadSupport.TYPICAL_AXIS_COUNT;
        while (typeof gamepad.axes[extraAxisId] != 'undefined') {
            tester.updateAxis(gamepad.axes[extraAxisId], gamepadId,
                'extra-axis-' + extraAxisId);

            extraAxisId++;
        }
        */

    }
};