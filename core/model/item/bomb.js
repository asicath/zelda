define(['./item', 'view/image_options', 'core/controller/sound'], function(Item, ImageOptions, Sound) {

    var sound = Sound('core/assets/sounds/get_item.wav');

    return function () {
        var my = Item();

        my.icon.spriteIndex = 1;
        my.icon.imageOptions = ImageOptions.RedToBlue;

        my.onPickUp = function (player) {
            // add a bomb
            player.bombs = (player.bombs || 0) + 1;

            sound.play();
        };

        return my;
    };

});
