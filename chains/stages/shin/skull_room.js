define([
    'dev/player_room',
    'chains/stages/shin/skull/skull',
    'core/controller/sound'
], function(
    PlayerRoom,
    Skull,
    Sound
) {

    var music = Sound('chains/stages/shin/sound/skullstart.wav');

    return function (data) {

        var my = PlayerRoom(data);

        var leftSkull, rightSkull;

        var addSkulls = function() {
            leftSkull = Skull();
            leftSkull.position.x = 16*4;
            leftSkull.position.y = 16*7;
            my.addEntity(leftSkull);

            rightSkull = Skull();
            rightSkull.position.x = 16*6;
            rightSkull.position.y = 16*7;
            my.addEntity(rightSkull);
        };

        addSkulls();

        music.play();

        my.setFrameTimeout(60*3, function() {
            leftSkull.icon.spriteIndex = 1;

            leftSkull.setFrameTimeout(60*3, function() {
                sayHello();
            });
        });

        var sayHello = function() {
            leftSkull.look("foreward");
            my.setFrameTimeout(60*1, function() {
                leftSkull.talk("hey!", function () {
                    my.setFrameTimeout(60 * 1, function () {
                        rightSkull.look("foreward");
                        my.setFrameTimeout(60*1, function() {
                            rightSkull.talk("what?", function () {
                                my.setFrameTimeout(60 * 1, function () {
                                    joke();
                                });
                            });
                        });
                    });
                });
            });
        };

        var joke = function() {
            //leftSkull.hopLeft();

            leftSkull.talk("why didn't the skull", function() {
                leftSkull.talk("dance at the party?", function() {
                    rightSkull.look("foreward");
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
            rightSkull.talk("ahahahahahahahaha", function() {
                rightSkull.look(null);
                my.setFrameTimeout(60*3, function() {
                    rightSkull.scream("aaaaahhhhhhhh!", dance);
                    avoid();
                });
            });
        };

        var avoid = function() {
            leftSkull.look("right");

            my.setFrameTimeout(60*7, function() {
                leftSkull.hopLeft();

                my.setFrameTimeout(60*2, function() {
                    leftSkull.look("left");
                    my.setFrameTimeout(60*2, function() {
                        leftSkull.talk("what a bonehead...", function () {

                        });
                    });
                });

            })

        };

        var dance = function() {
            rightSkull.hopRight();
            my.setFrameTimeout(60*1, function() {
                rightSkull.hopLeft();
                my.setFrameTimeout(60*1, function() {
                    dance();
                });
            });
        };



        return my;
    };

});