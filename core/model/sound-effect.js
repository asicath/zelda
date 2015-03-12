define(function() {

    //http://www.w3schools.com/tags/ref_av_dom.asp
    return function (url) {
        var my = {};

        var array = [];
        var lastPlay = 0;

        var createNewAudio = function () {
            var value = {
                audio: new Audio(requirejs.s.contexts._.config.baseUrl + url),
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