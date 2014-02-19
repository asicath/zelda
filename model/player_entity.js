
var PlayerEntity = function() {
    var my = Walker();

    my.rect = Rect(128, 88, 16, 16);

    my.sprites = Sprites.link;
    my.spriteIndex = 0;
    my.palette = Palettes.LinkGreen;

    var linkStep = 0;
    var flashIndex = 0;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        checkInput();

        // Walker uses input
        executeFrame_parent(room);

        if (my.hasVelocity()) {
            swapStep();
        }

    };

    var setFacing_parent = my.setFacing;
    my.setFacing = function(direction) {
        setFacing_parent(direction);

        // change sprite
        switch (direction) {
            case Directions.top:
                my.spriteIndex = 0;
                break;
            case Directions.bottom:
                my.spriteIndex = 3;
                break;
            case Directions.left:
                my.spriteIndex = 6;
                break;
            case Directions.right:
                my.spriteIndex = 9;
                break;
        }
    };

    my.getSprite = function() {
        return my.sprites[my.spriteIndex + linkStep];
    };



    my.speed = 80/60; // can move 80 pixels in 1s or 60 frames

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



        if (playerInput.up && !my.isMoving(Directions.top)) {
            my.startMoving(Directions.top);
        }
        else if (!playerInput.up && my.isMoving(Directions.top)) {
            my.endMoving(Directions.top);
        }

        if (playerInput.down && !my.isMoving(Directions.bottom)) {
            my.startMoving(Directions.bottom);
        }
        else if (!playerInput.down && my.isMoving(Directions.bottom)) {
            my.endMoving(Directions.bottom);
        }

        if (playerInput.left && !my.isMoving(Directions.left)) {
            my.startMoving(Directions.left);
        }
        else if (!playerInput.left && my.isMoving(Directions.left)) {
            my.endMoving(Directions.left);
        }

        if (playerInput.right && !my.isMoving(Directions.right)) {
            my.startMoving(Directions.right);
        }
        else if (!playerInput.right && my.isMoving(Directions.right)) {
            my.endMoving(Directions.right);
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



