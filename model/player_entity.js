
var PlayerEntity = function() {
    var my = Mover();

    my.rect = {
        x: 128,
        y: 88,
        width: 16,
        height: 16
    };

    my.sprites = Sprites.link;
    my.spriteIndex = 0;
    my.palette = Palettes.LinkGreen;

    var linkStep = 0;
    var flashIndex = 0;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        checkInput();
        executeFrame_parent(room);


    };

    my.getSprite = function() {
        return my.sprites[my.spriteIndex + linkStep];
    };



    var speed = 80/60; // can move 80 pixels in 1s or 60 frames

    var swapStepCount = 0;

    var swapStep = function() {
        if (swapStepCount++ % 6 == 0) {
            linkStep = linkStep > 0 ? 0 : 1;
        }
    };

    var flashPalates = [
        Palettes.LinkGreen,
        Palettes.MonsterBlue,
        Palettes.MonsterRed
    ];

    var flashing = false;

    var checkInput = function() {

        my.velocity.x = 0;
        my.velocity.y = 0;

        if (playerInput.up) {
            //my.rect.y -= speed;
            my.velocity.y = -speed;
            my.spriteIndex = 0;
            swapStep();
        }

        else if (playerInput.down) {
            //my.rect.y += speed;
            my.velocity.y = speed;
            my.spriteIndex = 3;
            swapStep();
        }

        else if (playerInput.left) {
            //my.rect.x -= speed;
            my.velocity.x = -speed;
            my.spriteIndex = 6;
            swapStep();
        }

        else if (playerInput.right) {
            //my.rect.x += speed;
            my.velocity.x = speed;
            my.spriteIndex = 9;
            swapStep();
        }


        if (playerInput.flash) {
            my.palette = flashPalates[Math.floor(flashIndex % 12 / 4)];
            flashIndex++;
            flashing = true;
        }
        else if (flashing) {
            flashing = false;
            my.palette = Palettes.LinkGreen;
        }

    };


    return my;
};



