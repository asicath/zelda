define(['./item', '../icon', 'view/sprite_sheet'], function(Item, Icon, SpriteSheet) {

    var spriteSheet = SpriteSheet({url:"core/assets/sprites/fairy.gif"});

    return function () {
        var my = Item();

        my.icon = Icon(my, spriteSheet);

        my.onPickUp = function (player) {
            var amount = 12;
            if (player.maxLife - player.life < amount) {
                amount = player.maxLife - player.life;
            }
            player.life += amount;

            Sounds.getItem.play();
        };

        return my;
    };

});