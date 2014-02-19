

var playerInput = {};


$(document).on('keydown', function(e1, e2, e3) {

    switch (e1.which) {
        case 87: playerInput.up = true; break;
        case 83: playerInput.down = true; break;
        case 65: playerInput.left = true; break;
        case 68: playerInput.right = true; break;
        case 32: playerInput.flash = true; break;
    }

});

$(document).on('keyup', function(e1, e2, e3) {

    switch (e1.which) {
        case 87: playerInput.up = false; break;
        case 83: playerInput.down = false; break;
        case 65: playerInput.left = false; break;
        case 68: playerInput.right = false; break;
        case 32: playerInput.flash = false; break;
    }

});



