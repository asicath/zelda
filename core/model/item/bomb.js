define(['./item', 'view/image_options'], function(Item, ImageOptions) {

    return function () {
        var my = Item();

        my.icon.spriteIndex = 1;
        my.icon.imageOptions = ImageOptions.RedToBlue;

        my.onPickUp = function (player) {
            // add a bomb
            player.bombs = (player.bombs || 0) + 1;

            Sounds.getItem.play();
        };

        return my;
    };

});
