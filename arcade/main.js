var baseUrl = "../core/";

var currentRoom;


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

var runDemo = function() {

    Sounds.loadAll();
    Music.loadAll();

    var music = LayeredMusicWithIntro(
        [
        {url: 'music/Layer1.mp3'},
        {url: 'music/Layer2.mp3'}
        ],
        {url:'music/Intro.mp3'}
    );

    loadAllSprites(function() {
        loadRoomJson('', baseUrl + 'assets/rooms/ow08-07.js', function(data) {

            currentRoom = DemoRoom(data);

            var cycle = DemoCycle(currentRoom);
            cycle.start();

            gamepadSupport.init();

            music.start();


            music.setPercent(0);

            var p = 0;
            setInterval(function() {
                if (p < 1) {
                    p+=0.01;
                    music.setPercent(p);
                }
            }, 1000);

            //Music.eightBit.loop = true;
            //Music.eightBit.play();
        });
    });

};

runDemo();

