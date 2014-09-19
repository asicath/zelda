define(['./item', '../icon', 'controller/load_sprites'], function(Item, Icon, LoadSprites) {

    LoadSprites.addSpriteSheet({url:"core/assets/sprites/fairy.gif", name:"fairy"});

    return function () {
        var my = Item();

        my.icon = Icon(my, SpriteSheets.fairy);

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