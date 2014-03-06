



var Sprites = {
    count: 0
};

var spriteLoadFinish = function() {

    if (++Sprites.count < 9) {return;}

    loadRoom('assets/ow07-06.js', function(room) {

        room.countToAddMonster = -1;

        startDraw(room);
        gamepadSupport.init();

        //room.createPlayer(0);


        music.loop = true;
        //music.play();
    });

};

loadSprites('assets/deathstar.gif', null, function(sprites) {
    Sprites.deathstar = sprites;
    spriteLoadFinish();
});

loadSprites('assets/outside.gif', null, function(outsideSprites) {
    Sprites.outside = outsideSprites;
    spriteLoadFinish();
});

loadSprites('assets/link.gif', null, function(linkSprites) {
    Sprites.link = linkSprites;
    spriteLoadFinish();
});

loadSprites('assets/octopus.gif', null, function(octopus) {
    Sprites.octopus = octopus;
    spriteLoadFinish();
});

loadSprites('assets/cloud.gif', null, function(cloud) {
    Sprites.cloud = cloud;
    spriteLoadFinish();
});

loadSprites('assets/heart.gif', null, function(heart) {
    Sprites.heart = heart;
    spriteLoadFinish();
});

loadSprites('assets/explosion.gif',     [
    {x:0,  y: 0, width: 8, height:10},
    {x:8,  y: 0, width: 8, height:10},
    {x:16, y: 0, width: 8, height:10},
    {x:24, y: 0, width: 8, height:10}
], function(explosion) {
    Sprites.explosion = explosion;
    spriteLoadFinish();
});

loadSprites('assets/sword.gif',
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

loadSprites('assets/letters.gif', null, function(sprites) {
    Sprites.letters = sprites;
    spriteLoadFinish();
});