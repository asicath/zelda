requirejs(['demo_cycle'], function(DemoCycle) {

    window.baseUrl = "../core/";

    Sounds.loadAll();
    Music.loadAll();

    loadAllSprites(function() {
        var cycle = DemoCycle();
        cycle.start();
    });

});
