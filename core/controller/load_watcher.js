
define(function() {

    var exports = {};

    var watching = 0;
    var complete = 0;

    exports.addWatch = function() {
        watching++;
        console.log('watching: ' + watching);
    };

    exports.complete = function() {
        complete++;
        console.log('complete: ' + complete);
        if (complete == watching) {
            onLoadComplete();
        }
    };



    var loadCompleteWatchers = [];

    exports.addLoadCompleteWatcher = function(onLoadComplete) {
        loadCompleteWatchers.push(onLoadComplete);

        console.log('waiting...');

        // might already be complete
        if (complete == watching) {
            onLoadComplete(complete);
        }
    };

    function onLoadComplete() {
        console.log('load complete');
        for (var i = 0; i < loadCompleteWatchers.length; i++) {
            loadCompleteWatchers[i](complete);
        }
    }

    return exports;

});
