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
    'controller/load_sprites',
    'controller/music',
    'controller/sound',
    'chains/stages/shin/chibiset/chibiset'
], function(
    a,
    Cycle,
    DemoCycle,
    LoadSprites,
    Music,
    Sounds,
    Monster
) {



    Sounds.loadAll();

    var music = new Audio(requirejs.s.contexts._.config.baseUrl + "chains/music/fire_in_the_arese.mp3");

    LoadSprites.loadAllSprites(function() {

        music.loop = true;
        music.play();

        var demoCycle = DemoCycle({Monster: Monster});

        var cycle = Cycle();
        cycle.setCurrent(demoCycle);
        cycle.start();
    });

});
