
var PlayerEntity = function() {
    var my = Entity();

    my.linkX = 128;
    my.linkY = 88;
    my.linkI = 0;

    my.linkStep = 0;
    my.palate = Palettes.LinkGreen;
    my.flashIndex = 0;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        executeFrame_parent(room);

        checkInput();
    };



    var stepAmount = 2;

    var swapStepCount = 0;

    var swapStep = function() {
        if (swapStepCount++ % 4 == 0) {
            my.linkStep = my.linkStep > 0 ? 0 : 1;
        }
    };

    var flashPalates = [
        Palettes.LinkGreen,
        Palettes.MonsterBlue,
        Palettes.MonsterRed
    ];

    var checkInput = function() {

        if (playerInput.up) {
            my.linkY -= stepAmount;
            my.linkI = 0;
            swapStep();
        }

        else if (playerInput.down) {
            my.linkY += stepAmount;
            my.linkI = 3;
            swapStep();
        }

        else if (playerInput.left) {
            my.linkX -= stepAmount;
            my.linkI = 6;
            swapStep();
        }

        else if (playerInput.right) {
            my.linkX += stepAmount;
            my.linkI = 9;
            swapStep();
        }

        if (playerInput.flash) {
            my.palate = flashPalates[Math.floor(my.flashIndex % 12 / 4)];
            my.flashIndex++;
        }

    };


    return my;
};



