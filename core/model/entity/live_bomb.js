var LiveBomb = function(player) {
    var my = Entity();

    my.entityType = 'livebomb';
    my.getFootPrint().setSize(16, 16);
    my.icon = Icon(my, SpriteSheets.items, 1);
    my.icon.imageOptions = ImageOptions.RedToBlue;
    my.playerId = player.playerId; // expose for kill counting in monster

    var explode = function() {

        Sounds.bombBlow.play();

        var clouds = [
            SpawnCloud(null),
            SpawnCloud(null),
            SpawnCloud(null),
            SpawnCloud(null),
            SpawnCloud(null),
            SpawnCloud(null),
            SpawnCloud(null)
        ];

        clouds[0].position.x = my.position.x - 8;
        clouds[1].position.x = my.position.x - 16;
        clouds[2].position.x = my.position.x - 8;
        clouds[3].position.x = my.position.x + 8;
        clouds[4].position.x = my.position.x + 16;
        clouds[5].position.x = my.position.x + 8;
        clouds[6].position.x = my.position.x;

        clouds[0].position.y = my.position.y - 16;
        clouds[1].position.y = my.position.y;
        clouds[2].position.y = my.position.y + 16;
        clouds[3].position.y = my.position.y - 16;
        clouds[4].position.y = my.position.y;
        clouds[5].position.y = my.position.y + 16;
        clouds[6].position.y = my.position.y;

        for (var i = 0; i < 7; i++) {
            my.room.addEntity(clouds[i]);
        }

        var blast = BombBlast(player);
        blast.position.x = my.position.x;
        blast.position.y = my.position.y;
        my.room.addEntity(blast);

        my.room.removeEntity(my);

    };

    var warning = function() {
        my.icon.startFlashing();
    };

    my.setFrameTimeout(160, explode);
    my.setFrameTimeout(80, warning);

    return my;
};