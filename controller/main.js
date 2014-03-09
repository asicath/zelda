



var Sprites = {
    count: 0
};

var spriteLoadFinish = function() {

    if (++Sprites.count < 10) {return;}

    loadRoom('assets/rooms/ow08-06.js', function(room) {

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

loadSprites('assets/sprites/cloud.gif', null, function(cloud) {
    Sprites.cloud = cloud;
    spriteLoadFinish();
});

loadSprites('assets/sprites/heart.gif', null, function(heart) {
    Sprites.heart = heart;
    spriteLoadFinish();
});

loadSprites('assets/sprites/items.gif', null, function(items) {
    Sprites.items = items;
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