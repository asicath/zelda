



var Sprites = {};

loadSprites('assets/outside.gif', function(outsideSprites) {
    loadSprites('assets/link.gif', function(linkSprites) {
        loadSprites('assets/octopus.gif', function(octopus) {


            Sprites.link = linkSprites;
            Sprites.outside = outsideSprites;
            Sprites.octopus = octopus;

            loadRoom('assets/ow07-06.js', function(room) {

                startDraw(room);

                gamepadSupport.init();

            });

        });
    });
});
