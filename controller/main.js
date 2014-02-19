



var Sprites = {};

loadSprites('assets/outside.gif', function(outsideSprites) {
    loadSprites('assets/link.gif', function(linkSprites) {

        Sprites.link = linkSprites;
        Sprites.outside = outsideSprites;

        loadRoom('assets/ow07-06.js', function(room) {

            startDraw(room);

        });
    });
});
