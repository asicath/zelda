

var playerInput = [{},{},{},{},{},{},{},{},{},{},{},{},{},{}];

var keyboardPlayerId = 12;

$(document).on('keydown', function(e1, e2, e3) {



    switch (e1.which) {
        case 87: playerInput[keyboardPlayerId].up = true; break;
        case 83: playerInput[keyboardPlayerId].down = true; break;
        case 65: playerInput[keyboardPlayerId].left = true; break;
        case 68: playerInput[keyboardPlayerId].right = true; break;
        case 13: playerInput[keyboardPlayerId].start = true; break;
        case 17: playerInput[keyboardPlayerId].special = true; break;
        case 32: playerInput[keyboardPlayerId].attack = true; break;
        case 80:
            if (music.paused) {
                music.play();
            }
            else {
                music.pause();
            }
            break;
    }

});

$(document).on('keyup', function(e1, e2, e3) {

    switch (e1.which) {
        case 87: playerInput[keyboardPlayerId].up = false; break;
        case 83: playerInput[keyboardPlayerId].down = false; break;
        case 65: playerInput[keyboardPlayerId].left = false; break;
        case 68: playerInput[keyboardPlayerId].right = false; break;
        case 13: playerInput[keyboardPlayerId].start = false; break;
        case 17: playerInput[keyboardPlayerId].special = false; break;
        case 32: playerInput[keyboardPlayerId].attack = false; break;
    }

});



