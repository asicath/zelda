define(['./entity', '../icon', 'core/model/entity/monster_hitter', 'view/sprite_sheet'], function(Entity, Icon, MonsterHitter, SpriteSheet) {

    var spriteSheet = SpriteSheet({url:"core/assets/sprites/boomerang.png"});

    return function (player, direction) {
        var my = Entity();

        my.icon = Icon(my, spriteSheet);

        MonsterHitter(my);

        my.playerId = player.playerId; // expose for kill counting in monster
        my.player = player;            // expose so items can be picked up by swords

        my.getFootPrint().setSize(8, 8);

        // fast moving away
        var isReturning = false;
        var speed = 3;

        my.setFrameTimeout(16, function () {
            // slow moving away
            speed = 1;
        });

        my.setFrameTimeout(15, function () {
            nextFrame();
        });

        my.setFrameTimeout(32, function () {
            startReturn();
        });

        var startReturn = function () {
            if (isReturning) return;

            // slow return
            isReturning = true;
            speed = 1;

            // fast return after 16 frames
            my.setFrameTimeout(16, function () {
                speed = 2;
            });
        };

        var nextFrame = function () {
            my.icon.spriteIndex = (my.icon.spriteIndex + 1) % 8;
        };

        var setupNextFrame = function () {
            my.setFrameTimeout(2, function () {
                nextFrame();
                setupNextFrame();
            });
        };

        setupNextFrame();

        var freeze = function (entity) {
            entity.freeze();
            entity.setFrameTimeout(154, function () {
                entity.unfreeze();
            });
        };

        my.onMonsterHit = function(monster) {
            freeze(monster);
            if (!isReturning) startReturn();
        };

        my.addFrameItem('post', executeMove);

        function executeMove() {

            var x = 0;
            var y = 0;

            if (isReturning) {

                if (my.position.x + 8 < player.position.x + 4) {
                    x += speed;
                }
                else if (my.position.x > player.position.x + 16 - 4) {
                    x -= speed;
                }

                if (my.position.y + 8 < player.position.y + 4) {
                    y += speed;
                }
                else if (my.position.y > player.position.y + 16 - 4) {
                    y -= speed;
                }

            }
            else {
                switch (direction) {
                    case Directions.bottom:
                        y += speed;
                        break;
                    case Directions.top:
                        y -= speed;
                        break;
                    case Directions.left:
                        x -= speed;
                        break;
                    case Directions.right:
                        x += speed;
                        break;
                }
            }

            my.position.x += x;
            my.position.y += y;

            if (x == 0 && y == 0) {
                my.room.removeEntity(my);
            }

        }

        return my;
    };

});