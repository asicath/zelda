define(['jquery', 'view/sprite_sheet'], function($, SpriteSheet) {

    window.SpriteSheets = {
        count: 0
    };

    var spriteInfo = [];

    // called from any file that will be needing a spritesheet
    var addSpriteSheet = function(info) {
        spriteInfo.push(info);
    };

    var loadAllSprites = function (success) {

        var spriteLoadFinish = function () {
            if (++SpriteSheets.count < spriteInfo.length) {
                return;
            }
            success();
        };

        var load = function (info) {
            SpriteSheet.loadFromImgUrl(info.url, info.map, info.width, function (sheet) {
                SpriteSheets[info.name] = sheet;
                spriteLoadFinish();
            });
        };

        for (var i = 0; i < spriteInfo.length; i++) {
            load(spriteInfo[i]);
        }

    };

    // load default sheets, MOVE THESE?

    addSpriteSheet({url:"assets/sprites/outside_green.gif", name:"outside"});
    addSpriteSheet({url:"assets/sprites/heart.gif", name:"heart"});
    addSpriteSheet({url:"assets/sprites/ball.gif", name:"ball"});
    addSpriteSheet({url:"assets/sprites/items.gif", name:"items"});
    addSpriteSheet({url:"assets/sprites/letters.gif", name:"letters"});
    addSpriteSheet({url:"assets/sprites/icons.gif", name:"icons"});
    addSpriteSheet({url:"assets/sprites/weapon_border.gif", name:"weaponBorder"});
    addSpriteSheet({url:"assets/sprites/weapon_icons.gif", name:"weaponIcons", width: 14});


    return {
        loadAllSprites: loadAllSprites,
        addSpriteSheet: addSpriteSheet
    };

});
