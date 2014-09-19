
define(function() {

//http://www.w3schools.com/tags/ref_av_dom.asp
    var Sound = function (url) {
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


    var Sounds = (function () {
        var my = {};

        var config = {
            sounds: [
                {file: 'core/assets/sounds/kill.wav', name: 'kill'},
                {file: 'core/assets/sounds/candle.wav', name: 'candle'},
                {file: 'core/assets/sounds/text.wav', name: 'text'},
                {file: 'core/assets/sounds/hit.wav', name: 'hit'},
                {file: 'core/assets/sounds/hurt.wav', name: 'hurt'},
                {file: 'core/assets/sounds/sword_shoot.wav', name: 'SwordShoot'},
                {file: 'core/assets/sounds/sword.wav', name: 'sword'},
                {file: 'core/assets/sounds/die.wav', name: 'die'},
                {file: 'core/assets/sounds/get_item.wav', name: 'getItem'},
                {file: 'core/assets/sounds/get_heart.wav', name: 'getHeart'},
                {file: 'core/assets/sounds/get_rupee.wav', name: 'getRupee'},
                {file: 'core/assets/sounds/shield.wav', name: 'shield'},
                {file: 'core/assets/sounds/fanfare.wav', name: 'fanfare'},
                {file: 'core/assets/sounds/Swrd Brst Full 2.mp3', name: 'swordForce'},
                {file: 'core/assets/sounds/White Magic.mp3', name: 'whiteMagic'},

                {file: 'core/assets/sounds/bomb_blow.wav', name: 'bombBlow'},
                {file: 'core/assets/sounds/bomb_drop.wav', name: 'bombDrop'},
                {file: 'core/assets/sounds/Defeat1.mp3', name: 'playerDefeat'}
            ]
        };

        my.loadAll = function () {

            for (var i = 0; i < config.sounds.length; i++) {
                var c = config.sounds[i];
                my[c.name] = Sound(baseUrl + c.file);
            }

        };

        return my;
    })();

    // HACK
    window.Sounds = Sounds;

    return Sounds;
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