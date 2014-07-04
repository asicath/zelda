

var playerInput = [];

var keyboardControlIndex = 0;

$(document).on('keydown', function(e1, e2, e3) {

    if (playerInput.length <= keyboardControlIndex || !playerInput[keyboardControlIndex]) {
        playerInput[keyboardControlIndex] = {};
    }

    switch (e1.which) {

        // WASD
        case 87: playerInput[keyboardControlIndex].up = true; break;
        case 83: playerInput[keyboardControlIndex].down = true; break;
        case 65: playerInput[keyboardControlIndex].left = true; break;
        case 68: playerInput[keyboardControlIndex].right = true; break;

        // Arrows
        case 37: playerInput[keyboardControlIndex].left = true; break;
        case 38: playerInput[keyboardControlIndex].up = true; break;
        case 39: playerInput[keyboardControlIndex].right = true; break;
        case 40: playerInput[keyboardControlIndex].down = true; break;

        // return
        case 13: playerInput[keyboardControlIndex].start = true; break;

        // left-ctrl
        case 17: playerInput[keyboardControlIndex].button_b = true; break;

        // space
        case 32: playerInput[keyboardControlIndex].button_a = true; break;

        // P
        case 80:
            if (Music.eightBit.paused) {
                Music.eightBit.play();
            }
            else {
                Music.eightBit.pause();
            }
            break;
    }

});

$(document).on('keyup', function(e1, e2, e3) {

    if (playerInput.length <= keyboardControlIndex || !playerInput[keyboardControlIndex]) {
        playerInput[keyboardControlIndex] = {};
    }

    switch (e1.which) {

        // WASD
        case 87: playerInput[keyboardControlIndex].up = false; break;
        case 83: playerInput[keyboardControlIndex].down = false; break;
        case 65: playerInput[keyboardControlIndex].left = false; break;
        case 68: playerInput[keyboardControlIndex].right = false; break;

        // Arrows
        case 37: playerInput[keyboardControlIndex].left = false; break;
        case 38: playerInput[keyboardControlIndex].up = false; break;
        case 39: playerInput[keyboardControlIndex].right = false; break;
        case 40: playerInput[keyboardControlIndex].down = false; break;

        // return
        case 13: playerInput[keyboardControlIndex].start = false; break;

        // left-ctrl
        case 17: playerInput[keyboardControlIndex].button_b = false; break;

        // space
        case 32: playerInput[keyboardControlIndex].button_a = false; break;
    }

});



