define(['view/sprite_sheet'], function(SpriteSheet) {

    window.SpriteSheets = {
        count: 0
    };

    var loadAllSprites = function (success) {

        $.getJSON(baseUrl + 'assets/sprite_info.js', function (spriteInfo) {

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

        });

    };

    return {
        loadAllSprites: loadAllSprites
    };

});
