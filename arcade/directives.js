

var Directives = (function() {
    var my = {};

    var messages = [
        "press enter to start",
        "use arrows or wasd to move",
        "press space to attack",
        "kill all the monsters",
        "",
        "press/hold ctrl to use alt weapon",
        "",
        "press shift to switch alt weapon",
        ""
    ];

    my.nextMessage = function(from) {
        if (messageIndex == from) {
            my.message = messages[++messageIndex];
            _gaq.push(['_trackEvent', 'achievement', 'v1.0', "m" + messageIndex]);
        }

    };

    var messageIndex = -1;

    return my;
})();
