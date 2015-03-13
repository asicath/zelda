define(['./item', 'core/controller/sound'], function(Item, Sound) {

    var sound = Sound('core/assets/sounds/get_item.wav');

    return function () {
        var my = Item();

        my.icon.spriteIndex = 3;

        my.onPickUp = function (player) {
            sound.play();
        };

        return my;
    };

});