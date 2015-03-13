define(['./item', 'view/image_options', 'core/controller/sound'], function(Item, ImageOptions, Sound) {

    var sound = Sound('core/assets/sounds/get_rupee.wav');

    return function () {
        var my = Item();

        my.icon.spriteIndex = 0;
        my.icon.imageOptions = ImageOptions.RedToBlue;

        my.onPickUp = function (player) {
            // add money
            player.rupees = (player.rupees || 0) + 5;

            sound.play();
        };

        return my;
    };

});
