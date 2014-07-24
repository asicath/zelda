var Death = function(entity, after) {
    var my = Entity();

    my.entityType = "death";
    my.position = entity.position;

    my.icon = Icon(my, SpriteSheets.deathstar);

    // flash red/blue
    my.icon.flashPalettes = [
        ImageOptions('red_blue').addColorSwap("16", "08").addColorSwap("27", "1C"),
        ImageOptions('white_gold').addColorSwap("16", "30").addColorSwap("27", "27"),
        ImageOptions('white_blue').addColorSwap("16", "30").addColorSwap("27", "22"),
        ImageOptions('red_gold').addColorSwap("16", "17").addColorSwap("27", "27")
    ];

    my.icon.startFlashing();

    // 19 frames of animation
    // 0 = blank

    // 1-6 small
    my.setFrameTimeout(1, function() {
        my.icon.spriteIndex = 2; // small
    });

    // 7-12 large
    my.setFrameTimeout(7, function() {
        my.icon.spriteIndex = 1; // large
    });

    // 13-18 small
    my.setFrameTimeout(13, function() {
        my.icon.spriteIndex = 2; // small
    });
    my.setFrameTimeout(19, function() {
        // animation is complete, remove from room
        my.room.removeEntity(my);

        if (after) after();
    });




    return my;
};