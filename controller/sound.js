var music = new Audio("assets/music/8 Bit Legend.mp3");

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
        }

    };

    return my;
};

var sound_kill = Sound("assets/sounds/kill.wav");
var sound_candle = Sound("assets/sounds/candle.wav");
var sound_text = Sound("assets/sounds/text.wav");
var sound_hit = Sound("assets/sounds/hit.wav");
var sound_hurt = Sound("assets/sounds/hurt.wav");
var sound_SwordShoot = Sound("assets/sounds/sword_shoot.wav");
var sound_sword = Sound("assets/sounds/sword.wav");
var sound_die = Sound("assets/sounds/die.wav");

var sound_getItem = Sound("assets/sounds/get_item.wav");
var sound_getHeart = Sound("assets/sounds/get_heart.wav");
var sound_getRupee = Sound("assets/sounds/get_rupee.wav");

var sound_swordForce = Sound("assets/sounds/Sword FCB.mp3");



var soundConfig = {

    sounds: [
        {file: 'assets/sounds/kill.wav', name:'kill'},
        {file: 'assets/sounds/hit.wav', name:'hit'},
        {file: 'assets/sounds/hurt.wav', name:'hurt'},
        {file: 'assets/sounds/sword_shoot.wav', name:'sword_shoot'},
        {file: 'assets/sounds/candle.wav', name:'candle'}
    ]

};

var Sounds = (function() {

    var audios = {};

})();