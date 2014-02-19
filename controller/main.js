





loadSprites('assets/outside.gif', function(sprites) {
    loadSprites('assets/link.gif', function(linkSprites) {

        loadRoom('assets/ow07-06.js', function(room) {

            startDraw(room, sprites, linkSprites);
            //startWorldTimer();

        });
    });
});
