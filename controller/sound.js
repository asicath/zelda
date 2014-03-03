var music = new Audio("assets/music/8 Bit Legend.mp3");


var soundKillArray = [];
for (var j = 0; j < 20; j++) {
    soundKillArray[j] = new Audio("assets/sounds/kill.wav");
}

var soundKillLastPlay = 0;
var soundKillIndex = 0;
var playSoundKill = function() {
    var now = new Date();

    if (now - soundKillLastPlay > 15) {
        soundKillLastPlay = now;
        soundKillArray[soundKillIndex++].play();
        if (soundKillIndex == soundKillArray.length) soundKillIndex = 0;
    }


};

var sound_kill = new Audio("assets/sounds/kill.wav");
var sound_hit = new Audio("assets/sounds/hit.wav");

var sound_hurt = new Audio("assets/sounds/hurt.wav");
var sound_SwordShoot = new Audio("assets/sounds/sword_shoot.wav");

var sound_candle = new Audio("assets/sounds/candle.wav");