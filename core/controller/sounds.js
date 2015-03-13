define(['core/controller/sound'], function(Sound) {

    var Sounds = (function () {
        var my = {};

        var config = {
            sounds: [
                {file: 'core/assets/sounds/candle.wav', name: 'candle'},
                {file: 'core/assets/sounds/text.wav', name: 'text'},
                {file: 'core/assets/sounds/sword_shoot.wav', name: 'SwordShoot'},
                {file: 'core/assets/sounds/sword.wav', name: 'sword'},
                {file: 'core/assets/sounds/shield.wav', name: 'shield'},

                {file: 'core/assets/sounds/Swrd Brst Full 2.mp3', name: 'swordForce'},
                {file: 'core/assets/sounds/White Magic.mp3', name: 'whiteMagic'},
                {file: 'chains/weapons/flamesword/fire_sword.mp3', name: 'flamingSword'}
            ]
        };

        my.loadAll = function () {

            for (var i = 0; i < config.sounds.length; i++) {
                var c = config.sounds[i];
                my[c.name] = Sound(c.file);
            }

        };

        return my;
    })();

    // GLOBAL HACK
    window.Sounds = Sounds;

    // just Load them
    Sounds.loadAll();

    return Sounds;
});
