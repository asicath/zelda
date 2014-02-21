
var PlayerWalker = function() {
    var my = Walker();

    my.rect = new Rect(128, 88, 16, 16);

    // has a smaller foot print than the monsters
    my.footPrint = new Rect(0, 8, 16, 8);

    my.spriteIndexes = [0, 3, 6, 9];

    my.sprites = Sprites.link;
    my.spriteIndex = 0;
    my.palette = Palettes.LinkGreen;

    my.step = 0;
    var flashIndex = 0;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        checkInput();

        // Walker uses input
        executeFrame_parent(room);

        if (my.canMove && my.hasVelocity()) {
            swapStep();
        }

    };

    var setFacing_parent = my.setFacing;
    my.setFacing = function(direction) {
        setFacing_parent(direction);

        // change sprite
        switch (direction) {
            case Directions.top:
                my.spriteIndex = my.spriteIndexes[0];
                break;
            case Directions.bottom:
                my.spriteIndex = my.spriteIndexes[1];
                break;
            case Directions.left:
                my.spriteIndex = my.spriteIndexes[2];
                break;
            case Directions.right:
                my.spriteIndex = my.spriteIndexes[3];
                break;
        }
    };

    my.getSprite = function() {
        return my.sprites[my.spriteIndex + my.step];
    };

    
    my.speed = 80/60; // can move 80 pixels in 1s or 60 frames

    var swapStepCount = 0;

    my.resetStep = function() {
        swapStepCount = 0;
        my.step = 0;
    };

    var swapStep = function() {
        if (swapStepCount++ % 6 == 0) {
            my.step  = my.step  > 0 ? 0 : 1;
        }
    };

    var flashPalates = [
        Palettes.LinkGreen,
        Palettes.MonsterBlue,
        Palettes.MonsterRed
    ];

    var flashing = false;



    var moving = {
        top: false,
        bottom: false,
        left: false,
        right: false
    };

    // determine which way the entity is walking if any
    var getMovingPriority = function() {
        if (moving[Directions.top]) { return Directions.top; }
        if (moving[Directions.bottom]) { return Directions.bottom; }
        if (moving[Directions.left]) { return Directions.left; }
        if (moving[Directions.right]) { return Directions.right; }
        return null;
    };

    var startMoving = function(direction) {
        //console.log("start move: " + direction);
        if (moving[direction]) {
            console.log("Already moving " + direction);
            return;
        }
        moving[direction] = true;
        my.setMoving(getMovingPriority());
    };

    var endMoving = function(direction) {
        //console.log("end move: " + direction);
        if (!moving[direction]) {
            console.log("Not moving " + direction);
            return;
        }
        moving[direction] = false;
        my.setMoving(getMovingPriority());
    };

    // controls which inputs are used
    my.playerId = 0;

    var checkInput = function() {



        if (playerInput[my.playerId].up && !moving[Directions.top]) {
            startMoving(Directions.top);
        }
        else if (!playerInput[my.playerId].up && moving[Directions.top]) {
            endMoving(Directions.top);
        }

        if (playerInput[my.playerId].down && !moving[Directions.bottom]) {
            startMoving(Directions.bottom);
        }
        else if (!playerInput[my.playerId].down && moving[Directions.bottom]) {
            endMoving(Directions.bottom);
        }

        if (playerInput[my.playerId].left && !moving[Directions.left]) {
            startMoving(Directions.left);
        }
        else if (!playerInput[my.playerId].left && moving[Directions.left]) {
            endMoving(Directions.left);
        }

        if (playerInput[my.playerId].right && !moving[Directions.right]) {
            startMoving(Directions.right);
        }
        else if (!playerInput[my.playerId].right && moving[Directions.right]) {
            endMoving(Directions.right);
        }



        if (playerInput[my.playerId].flash) {
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



