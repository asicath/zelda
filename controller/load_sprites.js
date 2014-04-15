
var Sprites = {
    count: 0
};

var loadAllSprites = function(success) {

    var spriteLoadFinish = function() {
        if (++Sprites.count < 18) {return;}
        success();
    };


    loadSpritesFromImgUrl('assets/sprites/deathstar.gif', null, function(sprites) {
        Sprites.deathstar = sprites;
        spriteLoadFinish();
    });

    loadSpritesFromImgUrl('assets/sprites/fairy.gif', null, function(fairy) {
        Sprites.fairy = fairy;
        spriteLoadFinish();
    });

    loadSpritesFromImgUrl('assets/sprites/outside.gif', null, function(outsideSprites) {
        Sprites.outside = outsideSprites;
        spriteLoadFinish();
    });

    loadSpritesFromImgUrl('assets/sprites/link.gif', null, function(linkSprites) {
        Sprites.link = linkSprites;
        spriteLoadFinish();
    });

    loadSpritesFromImgUrl('assets/sprites/octopus.gif', null, function(octopus) {
        Sprites.octopus = octopus;
        spriteLoadFinish();
    });

    loadSpritesFromImgUrl('assets/sprites/fly.gif', null, function(fly) {
        Sprites.fly = fly;
        spriteLoadFinish();
    });

    loadSpritesFromImgUrl('assets/sprites/cloud.gif', null, function(cloud) {
        Sprites.cloud = cloud;
        spriteLoadFinish();
    });

    loadSpritesFromImgUrl('assets/sprites/heart.gif', null, function(heart) {
        Sprites.heart = heart;
        spriteLoadFinish();
    });

    loadSpritesFromImgUrl('assets/sprites/rock.gif', null, function(rock) {
        Sprites.rock = rock;
        spriteLoadFinish();
    });

    loadSpritesFromImgUrl('assets/sprites/ball.gif', null, function(ball) {
        Sprites.ball = ball;
        spriteLoadFinish();
    });

    loadSpritesFromImgUrl('assets/sprites/items.gif', null, function(items) {
        Sprites.items = items;
        spriteLoadFinish();
    });

    loadSpritesFromImgUrl('assets/sprites/circle.gif', null, function(s) {
        Sprites.circle = s;
        spriteLoadFinish();
    });

    loadSpritesFromImgUrl('assets/sprites/element.gif', null, function(s) {
        Sprites.element = s;
        spriteLoadFinish();
    });

    loadSpritesFromImgUrl('assets/sprites/aquamentus.gif', [
        {x:0,  y: 0, width: 24, height:32},
        {x:24, y: 0, width: 24, height:32},
        {x:48, y: 0, width: 24, height:32},
        {x:72, y: 0, width: 24, height:32}
    ], function(aquamentus) {
        Sprites.aquamentus = aquamentus;
        spriteLoadFinish();
    });

    loadSpritesFromImgUrl('assets/sprites/gohma.gif', [
        {x:0,  y: 0, width: 48, height:16},
        {x:0,  y: 16, width: 48, height:16},
        {x:48,  y: 0, width: 48, height:16},
        {x:48,  y: 16, width: 48, height:16},
        {x:96,  y: 0, width: 48, height:16},
        {x:96,  y: 16, width: 48, height:16},
        {x:144,  y: 0, width: 48, height:16},
        {x:144,  y: 16, width: 48, height:16}

    ], function(gohma) {
        Sprites.gohma = gohma;
        spriteLoadFinish();
    });

    loadSpritesFromImgUrl('assets/sprites/explosion.gif',     [
        {x:0,  y: 0, width: 8, height:10},
        {x:8,  y: 0, width: 8, height:10},
        {x:16, y: 0, width: 8, height:10},
        {x:24, y: 0, width: 8, height:10}
    ], function(explosion) {
        Sprites.explosion = explosion;
        spriteLoadFinish();
    });

    loadSpritesFromImgUrl('assets/sprites/sword.gif',
        [
            {x:0, y: 0, width: 8, height:16},
            {x:8, y: 0, width: 8, height:16},
            {x:16, y: 0, width: 16, height:8},
            {x:16, y: 8, width: 16, height:8}
        ],

        function(sword) {
            Sprites.sword = sword;
            spriteLoadFinish();
        }
    );

    loadSpritesFromImgUrl('assets/sprites/letters.gif', null, function(sprites) {
        Sprites.letters = sprites;
        spriteLoadFinish();
    });

};