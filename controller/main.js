



var Sprites = {
    count: 0
};

var music = new Audio("assets/music/8 Bit Legend.mp3");


var soundKillArray = [];
for (var j = 0; j < 20; j++) {
    soundKillArray[j] = new Audio("assets/sounds/kill.wav");
}

var soundKillLastPlay = 0;
var soundKillIndex = 0;
var playSoundKill = function() {
    var now = new Date();

    if (now - soundKillLastPlay > 15) {
        soundKillLastPlay = now;
        soundKillArray[soundKillIndex++].play();
        if (soundKillIndex == soundKillArray.length) soundKillIndex = 0;
    }


};

var sound_kill = new Audio("assets/sounds/kill.wav");
var sound_hit = new Audio("assets/sounds/hit.wav");

var sound_hurt = new Audio("assets/sounds/hurt.wav");
var sound_SwordShoot = new Audio("assets/sounds/sword_shoot.wav");

var sound_candle = new Audio("assets/sounds/candle.wav");



var spriteLoadFinish = function() {

    if (++Sprites.count < 7) {return;}

    loadRoom('assets/ow07-06.js', function(room) {
        startDraw(room);
        gamepadSupport.init();


        music.loop=true;
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