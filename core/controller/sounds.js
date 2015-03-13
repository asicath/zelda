define(['core/controller/sound'], function(Sound) {

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
                {file: 'core/assets/sounds/Defeat1.mp3', name: 'playerDefeat'},

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
