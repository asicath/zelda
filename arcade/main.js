requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '../',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        view: 'core/view',
        controller: 'core/controller'
    }
});

requirejs([
    'core/model/directions',
    'core/controller/cycle',
    'arcade/demo_cycle',
    'arcade/blazingpixel_cycle',
    'controller/load_watcher',
    'controller/music',
    'controller/sound'
], function(
    a,
    Cycle,
    DemoCycle,
    LogoCycle,
    LoadWatcher,
    Music,
    Sounds
) {

    Sounds.loadAll();
    Music.loadAll();

    LoadWatcher.addLoadCompleteWatcher(function() {
        var demoCycle = DemoCycle();
        var logoCycle = LogoCycle();

        logoCycle.onLogoEnd = function() {
            cycle.setCurrent(demoCycle);
        };

        var cycle = Cycle();
        cycle.setCurrent(logoCycle);
        cycle.start();
    });

});
