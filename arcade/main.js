define(function() {

    Sounds.loadAll();
    Music.loadAll();

    loadAllSprites(function() {
        var cycle = DemoCycle();
        cycle.start();
    });

});
