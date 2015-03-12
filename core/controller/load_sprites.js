define(['jquery', 'view/sprite_sheet'], function($, SpriteSheet) {

    window.SpriteSheets = {
        count: 0
    };

    var spriteInfo = [];

    // called from any file that will be needing a spritesheet
    var addSpriteSheet = function(info) {
        spriteInfo.push(info);
        return info;
    };

    var loadAllSprites = function (success) {

        var spriteLoadFinish = function () {
            if (++SpriteSheets.count < spriteInfo.length) {
                return;
            }
            success();
        };

        var load = function (info) {
            SpriteSheet(info, function (sheet) {
                SpriteSheets[info.name] = sheet;
                info.spriteSheet = sheet;
                spriteLoadFinish();
            });
        };

        for (var i = 0; i < spriteInfo.length; i++) {
            load(spriteInfo[i]);
        }

    };

    return {
        loadAllSprites: loadAllSprites,
        addSpriteSheet: addSpriteSheet
    };

});
