



var Sprites = {
    count: 0
};


var spriteLoadFinish = function() {

    if (++Sprites.count < 4) {return;}

    loadRoom('assets/ow07-06.js', function(room) {
        startDraw(room);
        gamepadSupport.init();
    });

};



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