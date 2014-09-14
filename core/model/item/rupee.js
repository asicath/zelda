define(['./item', 'view/image_options'], function(Item, ImageOptions) {

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
            Sounds.getRupee.play();
        };

        return my;
    };

});