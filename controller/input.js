

var playerInput = [{}, {}];


$(document).on('keydown', function(e1, e2, e3) {

    switch (e1.which) {
        case 87: playerInput[0].up = true; break;
        case 83: playerInput[0].down = true; break;
        case 65: playerInput[0].left = true; break;
        case 68: playerInput[0].right = true; break;
        case 13: playerInput[0].special = true; break;
        case 32: playerInput[0].attack = true; break;
        case 80: music.play(); break;
    }

});

$(document).on('keyup', function(e1, e2, e3) {

    switch (e1.which) {
        case 87: playerInput[0].up = false; break;
        case 83: playerInput[0].down = false; break;
        case 65: playerInput[0].left = false; break;
        case 68: playerInput[0].right = false; break;
        case 13: playerInput[0].special = false; break;
        case 32: playerInput[0].attack = false; break;
    }

});



