
var Sprites = {
    count: 0
};

var loadAllSprites = function(success) {

    $.getJSON(baseUrl + 'assets/sprite_info.js', function(spriteInfo) {

        var spriteLoadFinish = function() {
            if (++Sprites.count < spriteInfo.length) {return;}
            success();
        };

        var load = function(info) {
            loadSpriteSheetFromImgUrl(info.url, info.map, function(sheet) {
                Sprites[info.name] = sheet.natural;
                spriteLoadFinish();
            });
        };

        for (var i = 0; i < spriteInfo.length; i++) {
            load(spriteInfo[i]);
        }

    });


};