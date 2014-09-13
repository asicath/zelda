define(['./item'], function(Item) {

    return function () {
        var my = Item();

        my.icon.spriteIndex = 3;

        my.onPickUp = function (player) {

            Sounds.getItem.play();
        };

        return my;
    };

});