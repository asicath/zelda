

requirejs(['../core/model/directions.js', 'demo_cycle'], function(a, DemoCycle) {

    window.baseUrl = "../core/";

    Sounds.loadAll();
    Music.loadAll();

    loadAllSprites(function() {
        var cycle = DemoCycle();
        cycle.start();
    });

});
