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

        var x = Math.floor(Math.random() * 16).toString();
        var y = Math.floor(Math.random() * 8).toString();

        if (x.length == 1) x = "0" + x;
        if (y.length == 1) y = "0" + y;

        loadRoomJson('', baseUrl + 'assets/rooms/ow' + x + '-' + y + '.js', function(data) {

            currentRoom = DemoRoom(data, music);

            currentRoom.title = "room " + x + "-" + y;

            var cycle = DemoCycle(currentRoom);
            cycle.start();

            gamepadSupport.init();

            //music.setPercent(0);
            //music.start();

            /*
            var p = 0;
            setInterval(function() {
                if (p < 1) {
                    p+=0.01;
                    music.setPercent(p);
                }
            }, 1000);
            */

            Music.eightBit.loop = true;
            Music.eightBit.play();
        });
    });

};

runDemo();

