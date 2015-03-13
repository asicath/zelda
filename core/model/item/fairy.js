define(['./item', '../icon', 'view/sprite_sheet', 'core/controller/sound'], function(Item, Icon, SpriteSheet, Sound) {

    var spriteSheet = SpriteSheet({url:"core/assets/sprites/fairy.gif"});
    var sound = Sound('core/assets/sounds/get_item.wav');

    return function () {
        var my = Item();

        my.icon = Icon(my, spriteSheet);

        my.onPickUp = function (player) {
            var amount = 12;
            if (player.maxLife - player.life < amount) {
                amount = player.maxLife - player.life;
            }
            player.life += amount;

            sound.play();
        };

        return my;
    };

});