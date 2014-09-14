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

requirejs(['core/model/directions', 'arcade/demo_cycle', 'controller/load_sprites'], function(a, DemoCycle, LoadSprites) {

    window.baseUrl = "../core/";

    Sounds.loadAll();
    Music.loadAll();

    LoadSprites.loadAllSprites(function() {
        var cycle = DemoCycle();
        cycle.start();
    });

});
