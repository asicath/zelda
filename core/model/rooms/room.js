define([
    '../rect',
    '../position',
    '../frame_event_haver',
    'view/color',
    'view/image_options',
    'view/sprite_sheet'
], function(
    Rect,
    Position,
    FrameEventHaver,
    Color,
    ImageOptions,
    SpriteSheet
) {

    var outsideSpriteSheet = SpriteSheet({url: "core/assets/sprites/outside_green.png"});

    return function (data) {

        var my = {};

        FrameEventHaver(my);

        var isActive = true;

        var removeAfterFrame = [];
        var addAfterFrame = [];

        my.walls = [];
        my.rect = new Rect(new Position(0, 0), 256, 176, 0, 0);
        my.entities = [];

        my.drawOffset = {
            x: 0,
            y: 0
        };

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


                tile.sprite = outsideSpriteSheet.sprites[tile.index];
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
                        my.walls.push({ rect: new Rect(new Position(x, y), 8, 8, 0, 0) });
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

            my.executePreFrame();

            // don't execute if not active
            if (!isActive) return;

            my.processEventQueue(my);

            executeFrameRound('executeFramePre');
            executeFrameRound('executeFrameFind');
            executeFrameRound('executeFramePost');
        };

        // frame event executed before checking isActive
        my.executePreFrame = function() {};

        function executeFrameRound(name) {
            var entity;

            // do entities
            for (var i = my.entities.length - 1; i >= 0; i--) {
                entity = my.entities[i];
                entity[name]();
            }

            // check add remove after each
            processAddAndRemoves();
        }

        function processAddAndRemoves() {
            // Remove entities
            while (removeAfterFrame.length) {
                var entity = removeAfterFrame.pop();

                var index = my.entities.indexOf(entity);
                if (index >= 0) {
                    my.entities.splice( index, 1 );
                }
            }

            // Add entities
            while (addAfterFrame.length) {
                var entity = addAfterFrame.pop();
                my.entities.push(entity);
                entity.room = my;

                entity.onAddToRoom();
            }
        }

        my.onPlayerKill = function () {};

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
            for (var i = my.walls.length - 1; i >= 0; i--) {
                if (my.walls[i].rect.intersects(rect)) return my.walls[i];
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

        var playerCheck = [function(e) {
            return e.isPlayer;
        }];

        my.getPlayers = function() {
            return my.getEntities(playerCheck);
        };


        var createRoomBackground = function () {

            // Create the virtual screen
            var buffer = document.createElement('canvas');
            buffer.width = my.rect.width;
            buffer.height = my.rect.height;
            var ctxBuffer = buffer.getContext('2d');

            // actually draw the sprites
            if (my.backgroundSprite) {
                my.backgroundSprite[0].drawSprite(ctxBuffer, 0, 0);
            }
            else {
                // draw to the virtual screen
                var i = 0;
                var img;
                while (i < my.tiles.length) {
                    var t = my.tiles[i];
                    img = t.sprite.getImage(t.imageOptions);
                    ctxBuffer.drawImage(img, t.x, t.y);
                    i++;
                }
            }

            my.backgroundImage = buffer;

        };

        function isVisible() {
            return my.drawOffset.x > -my.rect.width &&
                my.drawOffset.x < my.rect.width &&
                my.drawOffset.y > -my.rect.height &&
                my.drawOffset.y < my.rect.height;
        }


        my.drawRoom = function (ctx, xOffset, yOffset) {

            if (!isVisible()) return;

            // should only be needed once
            if (!my.backgroundImage) createRoomBackground();

            ctx.save();
            ctx.translate(xOffset + my.drawOffset.x, yOffset + my.drawOffset.y);

            // draw to the real screen
            ctx.drawImage(my.backgroundImage, 0, 0);

            // now the entities
            for (var i = my.entities.length - 1; i >= 0; i--) {
                my.entities[i].drawEntity(ctx);
            }


            ctx.restore();
        };

        my.pause = function() {
            isActive = false;
        };

        my.resume = function() {
            isActive = true;
        };


        return my;
    };

});