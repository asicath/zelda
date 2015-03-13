define(['./item', 'view/image_options', 'core/controller/sound'], function(Item, ImageOptions, Sound) {

    var sound = Sound('core/assets/sounds/get_rupee.wav');

    return function () {
        var my = Item();

        my.icon.spriteIndex = 0;

        // blinks every 8 frames
        my.icon.startFlashing(8);

        // flash red/blue
        my.icon.flashPalettes = [
            ImageOptions.RedToBlue,
            null
        ];

        my.onPickUp = function (player) {
            // add money
            player.rupees = (player.rupees || 0) + 1;
            sound.play();
        };

        return my;
    };

});