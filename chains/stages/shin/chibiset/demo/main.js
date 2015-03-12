requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '../../../../../',
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
    'chains/stages/shin/shin_cycle',
    'controller/load_watcher',
    'controller/music',
    'controller/sound',
    'chains/stages/shin/chibiset/chibiset'
], function(
    a,
    Cycle,
    DemoCycle,
    LoadWatcher,
    Music,
    Sounds,
    Monster
) {

    Sounds.loadAll();

    LoadWatcher.addLoadCompleteWatcher(function() {

        var demoCycle = DemoCycle({Monster: Monster});

        var cycle = Cycle();
        cycle.setCurrent(demoCycle);
        cycle.start();
    });

});
