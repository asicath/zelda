define([
    'dev/player_room',
    'chains/stages/shin/skull/skull'
], function(
    PlayerRoom,
    Skull
) {

    return function (data) {

        var my = PlayerRoom(data);

        var leftSkull, rightSkull;

        var addSkulls = function() {
            leftSkull = Skull();
            leftSkull.position.x = 16*6;
            leftSkull.position.y = 16*7;
            my.addEntity(leftSkull);

            rightSkull = Skull();
            rightSkull.position.x = 16*8;
            rightSkull.position.y = 16*7;
            my.addEntity(rightSkull);
        };

        addSkulls();

        my.setFrameTimeout(60*3, function() {
            leftSkull.icon.spriteIndex = 1;

            leftSkull.setFrameTimeout(60*3, function() {
                sayHello();
            });
        });

        var sayHello = function() {
            //leftSkull.hopLeft();
            leftSkull.look("foreward");
            leftSkull.talk("why didn't the skull", function() {
                leftSkull.talk("dance at the party?", function() {
                    leftSkull.look("foreward");
                    rightSkull.talk("idk why?", function() {
                        leftSkull.talk("he had nobody to dance with!", function() {
                            laugh();
                        });
                    });
                });
                //
            });
        };

        var laugh = function() {
            rightSkull.scream("ahahahahahahahaha");
            my.setFrameTimeout(60, function() {
                leftSkull.look("right");
            });
            my.setFrameTimeout(60*3, function() {
                leftSkull.hopLeft();
            });
            my.setFrameTimeout(60*4, function() {
                leftSkull.look("left");
            });
        };



        return my;
    };

});