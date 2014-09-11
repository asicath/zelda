
var Music = (function() {
    var my = {};

    my.loadAll = function() {

        my.eightBit = new Audio(baseUrl + "assets/music/8 Bit Legend.mp3");
        //my.normal = new Audio(baseUrl + "assets/music/ENM WAVE 1.mp3");
        //my.boss = new Audio(baseUrl + "assets/music/Boss 1 .mp3");
        //my.bossIntro = new Audio(baseUrl + "assets/music/Boss intro.mp3");

    };

    return my;
})();


//http://www.w3schools.com/tags/ref_av_dom.asp
var Sound = function(url) {
    var my = {};

    var array = [];
    var lastPlay = 0;

    var createNewAudio = function() {
        var value = {
            audio: new Audio(url),
            playing: false
        };

        value.audio.addEventListener('ended', function(){
            value.playing = false;
            value.audio.load();
        });

        array.push(value);

        return value;
    };

    // prime with one
    createNewAudio();

    my.play = function() {
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


var Sounds = (function() {
    var my = {};

    var config = {
        sounds: [
            {file: 'assets/sounds/kill.wav', name:'kill'},
            {file: 'assets/sounds/candle.wav', name:'candle'},
            {file: 'assets/sounds/text.wav', name:'text'},
            {file: 'assets/sounds/hit.wav', name:'hit'},
            {file: 'assets/sounds/hurt.wav', name:'hurt'},
            {file: 'assets/sounds/sword_shoot.wav', name:'SwordShoot'},
            {file: 'assets/sounds/sword.wav', name:'sword'},
            {file: 'assets/sounds/die.wav', name:'die'},
            {file: 'assets/sounds/get_item.wav', name:'getItem'},
            {file: 'assets/sounds/get_heart.wav', name:'getHeart'},
            {file: 'assets/sounds/get_rupee.wav', name:'getRupee'},
            {file: 'assets/sounds/shield.wav', name:'shield'},
            {file: 'assets/sounds/fanfare.wav', name:'fanfare'},
            {file: 'assets/sounds/Swrd Brst Full 2.mp3', name:'swordForce'},
            {file: 'assets/sounds/White Magic.mp3', name:'whiteMagic'},

            {file: 'assets/sounds/bomb_blow.wav', name:'bombBlow'},
            {file: 'assets/sounds/bomb_drop.wav', name:'bombDrop'},
            {file: 'assets/sounds/Defeat1.mp3', name:'playerDefeat'}
        ]
    };

    my.loadAll = function() {

        for (var i = 0; i < config.sounds.length; i++) {
            var c = config.sounds[i];
            my[c.name] = Sound(baseUrl + c.file);
        }

    };

    return my;
})();



