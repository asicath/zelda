
var Sprites = {
    count: 0
};

var loadAllSprites = function(success) {

    $.getJSON('assets/sprite_info.js', function(spriteInfo) {

        var spriteLoadFinish = function() {
            if (++Sprites.count < spriteInfo.length) {return;}
            success();
        };

        var load = function(info) {
            loadSpritesFromImgUrl(info.url, info.map, function(sprites) {
                Sprites[info.name] = sprites;
                spriteLoadFinish();
            });
        };

        for (var i = 0; i < spriteInfo.length; i++) {
            load(spriteInfo[i]);
        }

    });


};