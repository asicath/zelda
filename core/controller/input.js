

var playerInput = [{},{},{},{},{},{},{},{},{},{},{},{},{},{}];

var keyboardPlayerId = 12;

$(document).on('keydown', function(e1, e2, e3) {

    switch (e1.which) {

        // WASD
        case 87: playerInput[keyboardPlayerId].up = true; break;
        case 83: playerInput[keyboardPlayerId].down = true; break;
        case 65: playerInput[keyboardPlayerId].left = true; break;
        case 68: playerInput[keyboardPlayerId].right = true; break;

        // Arrows
        case 37: playerInput[keyboardPlayerId].left = true; break;
        case 38: playerInput[keyboardPlayerId].up = true; break;
        case 39: playerInput[keyboardPlayerId].right = true; break;
        case 40: playerInput[keyboardPlayerId].down = true; break;

        // return
        case 13: playerInput[keyboardPlayerId].start = true; break;

        // left-ctrl
        case 17: playerInput[keyboardPlayerId].button_b = true; break;

        // space
        case 32: playerInput[keyboardPlayerId].button_a = true; break;

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

    switch (e1.which) {

        // WASD
        case 87: playerInput[keyboardPlayerId].up = false; break;
        case 83: playerInput[keyboardPlayerId].down = false; break;
        case 65: playerInput[keyboardPlayerId].left = false; break;
        case 68: playerInput[keyboardPlayerId].right = false; break;

        // Arrows
        case 37: playerInput[keyboardPlayerId].left = false; break;
        case 38: playerInput[keyboardPlayerId].up = false; break;
        case 39: playerInput[keyboardPlayerId].right = false; break;
        case 40: playerInput[keyboardPlayerId].down = false; break;

        // return
        case 13: playerInput[keyboardPlayerId].start = false; break;

        // left-ctrl
        case 17: playerInput[keyboardPlayerId].button_b = false; break;

        // space
        case 32: playerInput[keyboardPlayerId].button_a = false; break;
    }

});



