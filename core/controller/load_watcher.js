
define(function() {

    var exports = {};

    var watching = 0;
    var complete = 0;

    exports.addWatch = function() {
        watching++;
    };

    exports.complete = function() {
        complete++;
        if (complete == watching) {
            onLoadComplete();
        }
    };



    var loadCompleteWatchers = [];

    exports.addLoadCompleteWatcher = function(onLoadComplete) {
        loadCompleteWatchers.push(onLoadComplete);

        // might already be complete
        if (complete == watching) {
            onLoadComplete(complete);
        }
    };

    function onLoadComplete() {
        for (var i = 0; i < loadCompleteWatchers.length; i++) {
            loadCompleteWatchers[i](complete);
        }
    }

    return exports;

});
