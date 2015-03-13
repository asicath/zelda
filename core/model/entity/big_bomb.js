define(['./entity', '../icon', './bomb_blast', './spawn_cloud', 'view/image_options', 'view/sprite_sheet', 'core/controller/sound'], function(Entity, Icon, BombBlast, SpawnCloud, ImageOptions, SpriteSheet, Sound) {

    var spriteSheet = SpriteSheet({url:"core/assets/sprites/bigbomb.png"});
    var sound = Sound('core/assets/sounds/bomb_blow.wav');

    return function (player) {
        var my = Entity();

        my.getFootPrint().setSize(16, 16);
        my.icon = Icon(my, spriteSheet);
        my.icon.imageOptions = ImageOptions.RedToBlue;
        my.playerId = player.playerId; // expose for kill counting in monster

        var cloudPositions = [

            // center
            {x: 0, y: 0},

            // top and bottom
            {x: 0, y: -32},
            {x: 0, y: 32},

            // Left
            {x: -8, y: -16},
            {x: -16, y: 0},
            {x: -8, y: 16},

            // outerleft
            {x: -16, y: -32},
            {x: -24, y: -16},
            {x: -32, y: 0},
            {x: -24, y: 16},
            {x: 16, y: -32},


            // Right
            {x: 8, y: -16},
            {x: 16, y: 0},
            {x: 8, y: 16},

            // outer right
            {x: -16, y: 32},
            {x: 24, y: -16},
            {x: 32, y: 0},
            {x: 24, y: 16},
            {x: 16, y: 32}

        ];

        var blastPositions = [
            {x: 0, y: 0},
            {x: -8, y: -16},
            {x: -16, y: 0},
            {x: -8, y: 16},
            {x: 8, y: -16},
            {x: 16, y: 0},
            {x: 8, y: 16}
        ];

        var explode = function () {

            sound.play();

            for (var i = 0; i < cloudPositions.length; i++) {
                var cloud = SpawnCloud(null);
                cloud.position.x = my.position.x + cloudPositions[i].x;
                cloud.position.y = my.position.y + cloudPositions[i].y;
                my.room.addEntity(cloud);
            }

            for (var i = 0; i < blastPositions.length; i++) {
                var blast = BombBlast(player);
                blast.position.x = my.position.x + blastPositions[i].x;
                blast.position.y = my.position.y + blastPositions[i].y;
                my.room.addEntity(blast);
            }

            my.room.removeEntity(my);

        };

        var warning = function () {
            my.icon.startFlashing();
        };

        my.setFrameTimeout(160, explode);
        my.setFrameTimeout(80, warning);

        return my;
    };

});