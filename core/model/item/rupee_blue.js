define(['./item', 'view/image_options'], function(Item, ImageOptions) {

    return function () {
        var my = Item();

        my.icon.spriteIndex = 0;
        my.icon.imageOptions = ImageOptions.RedToBlue;

        my.onPickUp = function (player) {
            // add money
            player.rupees = (player.rupees || 0) + 5;

            Sounds.getRupee.play();
        };

        return my;
    };

});
