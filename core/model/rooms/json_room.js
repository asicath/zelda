// reads json and creates a room

define([
    '../rect',
    './room',
    'view/image_options'
], function(
    Rect,
    Room,
    ImageOptions
) {

    return function (data) {

        var my = Room(data);

        // Load from tiles if present
        if (data.tiles) {
            my.tiles = data.tiles;

            var outsideGreen = null;
            var outsideBrown = ImageOptions('brown').addColorSwap("1A", "17");
            var outsideGrey = ImageOptions('grey').addColorSwap("1A", "20").addColorSwap("37", "00");

            var imageOptions = [
                outsideGreen,
                outsideBrown,
                outsideGrey
            ];

            // init tiles
            for (var i = my.tiles.length - 1; i >= 0; i--) {
                var tile = my.tiles[i];
                tile.position = new Position(tile.x, tile.y);
                tile.rect = new Rect(tile.position, 16, 16, 0, 0);


                tile.sprite = SpriteSheets.outside.sprites[tile.index];
                tile.imageOptions = imageOptions[tile.palette];
            }

            // init walls from tiles
            for (var i = my.tiles.length - 1; i >= 0; i--) {
                var tile = my.tiles[i];
                if (tile.type == 'wall') {
                    my.walls.push({rect: new Rect(new Position(tile.position.x, tile.position.y), 8, 8, 0, 0)});
                    my.walls.push({rect: new Rect(new Position(tile.position.x + 8, tile.position.y), 8, 8, 0, 0)});
                    my.walls.push({rect: new Rect(new Position(tile.position.x, tile.position.y + 8), 8, 8, 0, 0)});
                    if (tile.index != 24)
                        my.walls.push({rect: new Rect(new Position(tile.position.x + 8, tile.position.y + 8), 8, 8, 0, 0)});
                }
            }

        }

        return my;
    };
});
