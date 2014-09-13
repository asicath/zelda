define(['demo_cycle'], function(cycle) {

    window.baseUrl = "../core/";

    Sounds.loadAll();
    Music.loadAll();

    loadAllSprites(function() {
        cycle.start();
    });

});
