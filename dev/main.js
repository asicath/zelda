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

requirejs(['core/model/directions', 'dev/demo_cycle', 'controller/load_sprites', 'controller/music', 'controller/sound', 'dev/directives'], function(a, DemoCycle, LoadSprites, Music, Sounds, Directives) {

    window.baseUrl = "../";

    Sounds.loadAll();
    Music.loadAll();

    LoadSprites.loadAllSprites(function() {
        var cycle = DemoCycle();
        cycle.start();
    });

});
