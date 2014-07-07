var Crystal = function() {
    var my = Entity();

    my.entityType = 'crystal';
    my.getFootPrint().setSize(16, 16);
    my.icon = Icon(my, SpriteSheets.items, 0);
    my.icon.imageOptions = ImageOptions.RedToBlue;

    var level = 0;



    var flashes = [
        {interval: 40, colors: [
            ImageOptions('blue0').addColorSwap("27", "33"),
            ImageOptions('purp0').addColorSwap("27", "34")
        ]},
        {interval: 20, colors: [
            ImageOptions('blue1').addColorSwap("27", "23"),
            ImageOptions('purp1').addColorSwap("27", "24")
        ]},
        {interval: 10, colors: [
            ImageOptions('blue2').addColorSwap("27", "13"),
            ImageOptions('purp2').addColorSwap("27", "14")
        ]},
        {interval: 2, colors: [
            ImageOptions('blue3').addColorSwap("27", "03"),
            ImageOptions('purp3').addColorSwap("27", "04"),
            ImageOptions('red3').addColorSwap("27", "16"),
            ImageOptions('red3').addColorSwap("27", "30")
        ]}
    ];

    my.setLevel = function(level_a) {
        level = level_a;

        // flash red/blue
        my.icon.flashPalettes = flashes[level].colors;

        // blinks every 8 frames
        my.icon.startFlashing(flashes[level].interval);
    };

    my.setLevel(level);

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        executeFrame_parent(room);

        if (level < 3) return;

        // check for intersection
        var a = room.getIntersectingEntities(my, 'sword');
        if (a) {
            // create the entity
            var e = Aquamentus();

            // find a spot for it
            e.position.x = my.position.x;
            e.position.y = my.position.y;

            // place it in a spawn cloud
            var spawn = SpawnCloud(e);
            room.addEntity(spawn);

            room.removeEntity(my);
        }

    };


    return my;
};