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

requirejs(['core/model/directions', 'core/controller/cycle', 'dev/demo_cycle', 'controller/load_sprites', 'controller/music', 'controller/sound'], function(a, Cycle, DemoCycle, LoadSprites, Music, Sounds) {

    window.baseUrl = "../";

    Sounds.loadAll();
    Music.loadAll();

    LoadSprites.loadAllSprites(function() {
        var demoCycle = DemoCycle();

        var cycle = Cycle();
        cycle.setCurrent(demoCycle);
        cycle.start();
    });

});
