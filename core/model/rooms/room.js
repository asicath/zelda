define(['../rect', '../position', '../frame_event_haver', 'view/color', 'view/image_options'], function(Rect, Position, FrameEventHaver, Color, ImageOptions) {

    return function (data) {

        var my = {};

        FrameEventHaver(my);

        var removeAfterFrame = [];
        var addAfterFrame = [];

        var walls = [];
        my.rect = new Rect(new Position(0, 0), 256, 176, 0, 0);
        my.entities = [];

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
                    walls.push({ rect: new Rect(new Position(tile.position.x, tile.position.y), 8, 8, 0, 0) });
                    walls.push({ rect: new Rect(new Position(tile.position.x + 8, tile.position.y), 8, 8, 0, 0) });
                    walls.push({ rect: new Rect(new Position(tile.position.x, tile.position.y + 8), 8, 8, 0, 0) });
                    if (tile.index != 24)
                        walls.push({ rect: new Rect(new Position(tile.position.x + 8, tile.position.y + 8), 8, 8, 0, 0) });
                }
            }

        }

        if (data.overlay) {
            my.backgroundSprite = data.overlay.sprite;
            my.tiles = [];


            var wallColor = Color.fromNESPalette("00");

            // init walls
            var overlay = data.overlay.overlay[0];
            for (var x = 0; x < 256; x += 8) {
                for (var y = 0; y < 176; y += 8) {
                    var p = overlay.getPixel(x, y);
                    if (p.color.equals(wallColor)) {
                        walls.push({ rect: new Rect(new Position(x, y), 8, 8, 0, 0) });
                    }
                    else {

                        var p1 = overlay.getPixel(x + 8, y);
                        var p2 = overlay.getPixel(x, y + 8);
                        var p3 = overlay.getPixel(x + 8, y + 8);

                        if (p1 && p2 && p3 && !p1.color.equals(wallColor) && !p2.color.equals(wallColor) && !p3.color.equals(wallColor)) {

                            var tile = {x: x, y: y, type: 'floor'};
                            tile.position = new Position(tile.x, tile.y);
                            tile.rect = new Rect(tile.position, 16, 16, 0, 0);
                            my.tiles.push(tile);
                        }
                    }
                }
            }

        }


        my.executeFrame = function () {

            my.processEventQueue(my);

            // do entities
            for (var i = my.entities.length - 1; i >= 0; i--) {
                my.entities[i].executeFrame(my);
            }

            // Remove entities
            while (removeAfterFrame.length) {
                var entity = removeAfterFrame.pop();

                // construct a new array without the entity
                var a = [];
                for (var i = 0; i < my.entities.length; i++) {
                    if (my.entities[i] != entity) {
                        a.push(my.entities[i]);
                    }
                }

                my.entities = a;

                // let it keep reference
                //entity.room = null;
            }

            // Add entities
            while (addAfterFrame.length) {
                var entity = addAfterFrame.pop();
                my.entities.push(entity);
                entity.room = my;

                entity.onAddToRoom();
            }


        };

        my.onPlayerKill = function () {
        };

        my.transferPlayers = function (sourceRoom) {
            // first get the players
            my.players = sourceRoom.players;

            // then add them to valid spots in the room
            for (var i = 0; i < my.players.length; i++) {
                // Allow start if possible
                if (my.players[i] && !my.players[i].isDead) {
                    my.addEntityAtOpenTile(my.players[i]);
                }
            }
        };

        my.addEntityAtOpenTile = function (entity) {
            var tile = null;
            while (!tile) {
                var i = Math.floor(Math.random() * my.tiles.length);
                if (my.tiles[i].type == 'floor') tile = my.tiles[i];
            }
            entity.position.copy(tile.position);

            my.addEntity(entity);
        };

        my.addEntity = function (entity) {
            addAfterFrame.push(entity);
        };

        my.removeEntity = function (entity) {
            removeAfterFrame.push(entity);
        };

        my.intersectsWall = function (rect) {
            for (var i = walls.length - 1; i >= 0; i--) {
                if (walls[i].rect.intersects(rect)) return walls[i];
            }
            return false;
        };

        my.getEntities = function(checks) {
            var a = null;
            var e = null;
            var found = false;

            for (var i = my.entities.length - 1; i >= 0; i--) {

                e = my.entities[i];

                found = true;
                for (var j = 0; j < checks.length; j++) {
                    if (!checks[j](e)) {
                        found = false;
                        break;
                    }
                }

                if (found) {
                    if (a == null) a = [];
                    a.push(e);
                }

            }

            return a;
        };

        return my;
    };

});