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

    // load default sheets, MOVE THESE

    addSpriteSheet({url:"assets/sprites/deathstar.gif", name:"deathstar"});
    addSpriteSheet({url:"assets/sprites/fairy.gif", name:"fairy"});
    addSpriteSheet({url:"assets/sprites/outside_green.gif", name:"outside"});
    addSpriteSheet({url:"assets/sprites/link.gif", name:"link"});

    addSpriteSheet({url:"assets/sprites/moblin.gif", name:"moblin"});
    addSpriteSheet({url:"assets/sprites/cloud.gif", name:"cloud"});
    addSpriteSheet({url:"assets/sprites/heart.gif", name:"heart"});
    addSpriteSheet({url:"assets/sprites/rock.gif", name:"rock"});
    addSpriteSheet({url:"assets/sprites/ball.gif", name:"ball"});
    addSpriteSheet({url:"assets/sprites/items.gif", name:"items"});
    addSpriteSheet({url:"assets/sprites/circle.gif", name:"circle"});
    addSpriteSheet({url:"assets/sprites/element.gif", name:"elements"});
    addSpriteSheet({url:"assets/sprites/aquamentus.gif", name:"aquamentus", map:[
        {x:0,  y: 0, width: 24, height:32},
        {x:24, y: 0, width: 24, height:32},
        {x:48, y: 0, width: 24, height:32},
        {x:72, y: 0, width: 24, height:32}
    ]});
    addSpriteSheet({url:"assets/sprites/gohma.gif", name:"gohma", map:[
        {x:0,  y: 0, width: 48, height:16},
        {x:0,  y: 16, width: 48, height:16},
        {x:48,  y: 0, width: 48, height:16},
        {x:48,  y: 16, width: 48, height:16},
        {x:96,  y: 0, width: 48, height:16},
        {x:96,  y: 16, width: 48, height:16},
        {x:144,  y: 0, width: 48, height:16},
        {x:144,  y: 16, width: 48, height:16}
    ]});
    addSpriteSheet({url:"assets/sprites/explosion.gif", name:"explosion", map:[
        {x:0,  y: 0, width: 8, height:10},
        {x:8,  y: 0, width: 8, height:10},
        {x:16, y: 0, width: 8, height:10},
        {x:24, y: 0, width: 8, height:10}
    ]});
    addSpriteSheet({url:"assets/sprites/sword.gif", name:"sword",map:[
            {x:0, y: 0, width: 8, height:16},
            {x:8, y: 0, width: 8, height:16},
            {x:16, y: 0, width: 16, height:8},
            {x:16, y: 8, width: 16, height:8}
        ]});
    addSpriteSheet({url:"assets/sprites/letters.gif", name:"letters"});
    addSpriteSheet({url:"assets/sprites/icons.gif", name:"icons"});
    addSpriteSheet({url:"assets/sprites/boomerang.gif", name:"boomerang"});
    addSpriteSheet({url:"assets/sprites/bigbomb.gif", name:"bigbomb"});
    addSpriteSheet({url:"assets/sprites/weapon_border.gif", name:"weaponBorder"});
    addSpriteSheet({url:"assets/sprites/weapon_icons.gif", name:"weaponIcons", width: 14});


    return {
        loadAllSprites: loadAllSprites,
        addSpriteSheet: addSpriteSheet
    };

});
