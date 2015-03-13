define(['./item', 'view/image_options', 'core/controller/sound'], function(Item, ImageOptions, Sound) {

    var sound = Sound('core/assets/sounds/get_heart.wav');

    return function () {
        var my = Item();

        my.icon.spriteIndex = 2;

        // blinks every 8 frames
        my.icon.startFlashing(8);

        // flash red/blue
        my.icon.flashPalettes = [
            ImageOptions.RedToBlue,
            null
        ];

        my.onPickUp = function (player) {
            var amount = 4;
            if (player.maxLife - player.life < amount) {
                amount = player.maxLife - player.life;
            }
            player.life += amount;

            sound.play();
        };

        return my;
    };

});
