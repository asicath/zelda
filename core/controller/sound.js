//http://www.w3schools.com/tags/ref_av_dom.asp


define(function() {

    return function (url) {
        var my = {};

        var array = [];
        var lastPlay = 0;

        var createNewAudio = function () {
            var value = {
                audio: new Audio(url),
                playing: false
            };

            value.audio.addEventListener('ended', function () {
                value.playing = false;
                value.audio.load();
            });

            array.push(value);

            return value;
        };

        // prime with one
        createNewAudio();

        my.play = function () {
            var now = new Date();

            if (now - lastPlay > 0) {
                lastPlay = now;

                // Find the next available audio
                var i = 0;
                var target = null;
                while (!target && i < array.length) {
                    if (!array[i].playing) target = array[i];
                    i++;
                }

                // all other audio busy, create a new one
                if (!target) {
                    target = createNewAudio();
                }

                target.playing = true;
                target.audio.play();

                return target.audio;
            }

        };

        return my;
    };

});


/*
var LayeredMusicWithIntro = function(layers, intro) {
    var my = LayeredMusic(layers);

    intro.audio = new Audio(intro.url);

    var start_base = my.start;
    my.start = function() {
        intro.audio.addEventListener('ended', function () {
            this.load();
            start_base();
        }, false);

        intro.audio.play();
    };

    var isReadyToPlay_base = my.isReadyToPlay;
    my.isReadyToPlay = function() {
        if (intro.audio.readyState < 3) return false;
        return isReadyToPlay_base();
    };

    var setPercent_base = my.setPercent;
    my.setPercent = function(level) {
        var full = 1 / layers.length;
        var n = level / full;

        if (n > 1) {
            intro.audio.volume = 1;
        }
        else {
            intro.audio.volume = n;
        }
        setPercent_base(level);
    };

    return my;
};

var LayeredMusic = function(layers) {
    var my = {};

    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        layer.audio = new Audio(layer.url);
        //layer.audio.loop = true; // doesn't work in chrome
        layer.audio.addEventListener('ended', function () {
            this.load();
            this.play();
        }, false);
    }

    my.isReadyToPlay = function() {
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].audio.readyState < 3) return false;
        }
        return true;
    };

    my.start = function() {
        for (var i = 0; i < layers.length; i++) {
            layers[i].audio.play();
        }
    };

    my.setPercent = function(level) {
        var full = 1 / layers.length;
        var n = level / full;
        for (var i = 0; i < layers.length; i++) {
            if (n >= 1) {
                layers[i].audio.volume = 1;
                n -= 1;
            }
            else {
                layers[i].audio.volume = n;
                n = 0;
            }
        }
    };

    return my;
};
*/