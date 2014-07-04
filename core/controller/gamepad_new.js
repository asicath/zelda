http://www.w3.org/TR/gamepad/#attributes

var gamepadSupport = (function() {
    var my = {};

    my.init = function() {

        window.addEventListener("gamepadconnected", function(e) {
            console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
                e.gamepad.index, e.gamepad.id,
                e.gamepad.buttons.length, e.gamepad.axes.length);
        });

    };

    var checkForNewGamePads = function() {
        var g = navigator.getGamepads();



        //console.log(g.length);
    };

    my.pollStatus = function() {
        //checkForNewGamePads();

        var playerId = 0;

        var pads = navigator.getGamepads();


        var j;
        for (var i in pads) {

            var gamepad = pads[i];

            if (!gamepad || i.length > 1) continue;
            if (gamepad.buttons.length == 0) continue;

            //var playerId = parseInt(i);

            playerInput[playerId].down = false;
            playerInput[playerId].up = false;
            playerInput[playerId].left = false;
            playerInput[playerId].right = false;

            // Firefox and some pads on chrome
            if (gamepad.axes.length > 0) {
                var threshold = 0.75;
                j = 0;
                // if uneven number of axes, start at 1?
                if (gamepad.axes.length % 2 == 1) j = 1;

                while (j < gamepad.axes.length) {
                    if (gamepad.axes[j+1] > threshold) playerInput[playerId].down = true;
                    if (gamepad.axes[j+1] < -threshold) playerInput[playerId].up = true;
                    if (gamepad.axes[j] > threshold) playerInput[playerId].right = true;
                    if (gamepad.axes[j] < -threshold) playerInput[playerId].left = true;
                    j += 2;
                }

            }

            // Some pads on chrome
            if (gamepad.buttons.length >= 16){
                if (gamepad.buttons[12].value > 0) playerInput[playerId].up = true;
                if (gamepad.buttons[13].value > 0) playerInput[playerId].down = true;
                if (gamepad.buttons[14].value > 0) playerInput[playerId].left = true;
                if (gamepad.buttons[15].value > 0) playerInput[playerId].right = true;
            }

            playerInput[playerId].button_a = gamepad.buttons[0].value > 0 || gamepad.buttons[2].value > 0; // actually the B
            playerInput[playerId].button_b = gamepad.buttons[1].value > 0 || gamepad.buttons[3].value > 0; // A
            playerInput[playerId].start = gamepad.buttons[7].value > 0 || gamepad.buttons[9].value > 0;
            playerInput[playerId].select = gamepad.buttons[6].value > 0 || gamepad.buttons[8].value > 0;



            playerId++;
        }

    };

    /*
     axes: Array[0]
     buttons: Array[16]
     connected: true
     id: "USB Gamepad  (STANDARD GAMEPAD Vendor: 0079 Product: 0011)"
     index: 1
     mapping: "standard"
     timestamp: 50341

     axes: Array[4]
     buttons: Array[16]
     connected: true
     id: "Xbox 360 Controller (XInput STANDARD GAMEPAD)"
     index: 2
     mapping: "standard"
     timestamp: 2
     */

    return my;
})();

