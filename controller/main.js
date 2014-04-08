



var Sprites = {
    count: 0
};

var spriteLoadFinish = function() {

    if (++Sprites.count < 18) {return;}

    loadRoom('assets/rooms/ow08-07.js', function(room) {

        //room.countToAddMonster = -1;

        startDraw(room);
        gamepadSupport.init();

        room.createPlayer(0);


        music.loop = true;
        //music.play();
    });

};

loadSprites('assets/sprites/deathstar.gif', null, function(sprites) {
    Sprites.deathstar = sprites;
    spriteLoadFinish();
});

loadSprites('assets/sprites/fairy.gif', null, function(fairy) {
    Sprites.fairy = fairy;
    spriteLoadFinish();
});

loadSprites('assets/sprites/outside.gif', null, function(outsideSprites) {
    Sprites.outside = outsideSprites;
    spriteLoadFinish();
});

loadSprites('assets/sprites/link.gif', null, function(linkSprites) {
    Sprites.link = linkSprites;
    spriteLoadFinish();
});

loadSprites('assets/sprites/octopus.gif', null, function(octopus) {
    Sprites.octopus = octopus;
    spriteLoadFinish();
});

loadSprites('assets/sprites/fly.gif', null, function(fly) {
    Sprites.fly = fly;
    spriteLoadFinish();
});

loadSprites('assets/sprites/cloud.gif', null, function(cloud) {
    Sprites.cloud = cloud;
    spriteLoadFinish();
});

loadSprites('assets/sprites/heart.gif', null, function(heart) {
    Sprites.heart = heart;
    spriteLoadFinish();
});

loadSprites('assets/sprites/rock.gif', null, function(rock) {
    Sprites.rock = rock;
    spriteLoadFinish();
});

loadSprites('assets/sprites/ball.gif', null, function(ball) {
    Sprites.ball = ball;
    spriteLoadFinish();
});

loadSprites('assets/sprites/items.gif', null, function(items) {
    Sprites.items = items;
    spriteLoadFinish();
});

loadSprites('assets/sprites/circle.gif', null, function(s) {
    Sprites.circle = s;
    spriteLoadFinish();
});

loadSprites('assets/sprites/element.gif', null, function(s) {
    Sprites.element = s;
    spriteLoadFinish();
});

loadSprites('assets/sprites/aquamentus.gif', [
    {x:0,  y: 0, width: 24, height:32},
    {x:24, y: 0, width: 24, height:32},
    {x:48, y: 0, width: 24, height:32},
    {x:72, y: 0, width: 24, height:32}
], function(aquamentus) {
    Sprites.aquamentus = aquamentus;
    spriteLoadFinish();
});

loadSprites('assets/sprites/gohma.gif', [
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

loadSprites('assets/sprites/explosion.gif',     [
    {x:0,  y: 0, width: 8, height:10},
    {x:8,  y: 0, width: 8, height:10},
    {x:16, y: 0, width: 8, height:10},
    {x:24, y: 0, width: 8, height:10}
], function(explosion) {
    Sprites.explosion = explosion;
    spriteLoadFinish();
});

loadSprites('assets/sprites/sword.gif',
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

loadSprites('assets/sprites/letters.gif', null, function(sprites) {
    Sprites.letters = sprites;
    spriteLoadFinish();
});